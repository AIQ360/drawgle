import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateCover } from "@/utils/fal/cover-generator"
import { generateUUID } from "@/lib/utils"

export async function POST(request: Request) {
  console.log("🔍 [API] POST /api/generate-cover - Starting")

  try {
    // Get the current user from Supabase
    console.log("🔍 [API] Creating Supabase client")
    const supabase = createClient()

    console.log("🔍 [API] Getting user from auth")
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error("❌ [API] Auth error:", userError)
      return NextResponse.json({ error: "Authentication error: " + userError.message }, { status: 401 })
    }

    if (!user) {
      console.error("❌ [API] No user found in session")
      return NextResponse.json({ error: "Unauthorized - No user found" }, { status: 401 })
    }

    console.log("✅ [API] User authenticated:", user.id)

    // Get user metadata
    console.log("🔍 [API] Getting user metadata")
    const { data: userData, error: metadataError } = await supabase
      .from("users_metadata")
      .select("*")
      .eq("id", user.id)
      .single()

    if (metadataError) {
      console.error("❌ [API] Error fetching user metadata:", metadataError)
      return NextResponse.json({ error: "Error fetching user data: " + metadataError.message }, { status: 500 })
    }

    if (!userData) {
      console.error("❌ [API] User metadata not found")
      return NextResponse.json({ error: "User metadata not found" }, { status: 404 })
    }

    console.log("✅ [API] User metadata retrieved:", userData.id)

    // Parse request body
    console.log("🔍 [API] Parsing request body")
    let body
    try {
      body = await request.json()
    } catch (error) {
      console.error("❌ [API] Error parsing request body:", error)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { prompt, title, subtitle, authorName, style } = body

    if (!prompt || !title) {
      console.error("❌ [API] Missing required fields:", { prompt: !!prompt, title: !!title })
      return NextResponse.json({ error: "Missing required fields: prompt and title" }, { status: 400 })
    }

    console.log("✅ [API] Request body parsed successfully")
    console.log("🔍 [API] Prompt:", prompt)
    console.log("🔍 [API] Style:", style || "auto")

    // Check if user has enough credits
    if (userData.credits < 5) {
      console.error("❌ [API] Not enough credits:", userData.credits)
      return NextResponse.json({ error: "Not enough credits" }, { status: 400 })
    }

    console.log("✅ [API] User has enough credits:", userData.credits)

    // Generate cover directly
    console.log("🔍 [API] Generating cover")
    let falCoverUrl
    try {
      falCoverUrl = await generateCover({
        prompt,
        style: style || "auto",
        userId: user.id,
      })
    } catch (error: any) {
      console.error("❌ [API] Error generating cover:", error)
      return NextResponse.json({ error: "Error generating cover: " + error.message }, { status: 500 })
    }

    console.log("✅ [API] Cover generated successfully from Fal AI:", falCoverUrl)

    // Upload the image to Supabase storage
    console.log("🔍 [API] Uploading cover to Supabase storage")
    let coverUrl
    try {
      // Fix: Use the same approach as coloring pages - store in private folder
      const response = await fetch(falCoverUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
      }

      const blob = await response.blob()
      console.log("✅ [API] Image fetched successfully, size:", blob.size)

      // Generate a unique filename in the private folder
      const timestamp = Date.now()
      const safeTitle = title.slice(0, 20).replace(/[^a-z0-9]/gi, "_")
      const filename = `private/${user.id}-${timestamp}-cover-${safeTitle}.png`
      console.log("🔍 [API] Generated filename:", filename)

      // Upload to Supabase Storage
      console.log("🔍 [API] Uploading to bucket: coloring-pages")
      const { data, error } = await supabase.storage.from("coloring-pages").upload(filename, blob, {
        contentType: "image/png",
        upsert: false,
      })

      if (error) {
        console.error("❌ [API] Upload error details:", JSON.stringify(error, null, 2))
        throw error
      }

      console.log("✅ [API] Upload successful:", data)

      // Get the public URL
      const { data: publicUrlData } = supabase.storage.from("coloring-pages").getPublicUrl(filename)
      coverUrl = publicUrlData.publicUrl
      console.log("✅ [API] Public URL generated:", coverUrl)
    } catch (error: any) {
      console.error("❌ [API] Error uploading to storage, falling back to Fal URL:", error)
      // Fall back to the Fal AI URL if storage upload fails
      coverUrl = falCoverUrl
    }

    // Generate a UUID for the cover image
    const coverId = generateUUID()
    console.log("✅ [API] Generated cover ID:", coverId)

    // Save the cover image to the cover_images table
    console.log("🔍 [API] Saving cover image to database")
    const { error: coverError } = await supabase.from("cover_images").insert({
      id: coverId,
      user_id: user.id,
      image_url: coverUrl,
      prompt: prompt,
      created_at: new Date().toISOString(),
    })

    if (coverError) {
      console.error("❌ [API] Error saving cover image:", coverError)
      return NextResponse.json({ error: "Failed to save cover image: " + coverError.message }, { status: 500 })
    }

    console.log("✅ [API] Cover image saved to database with ID:", coverId)

    // Deduct credits using direct UPDATE instead of RPC
    console.log("🔍 [API] Deducting credits")
    const { error: creditError } = await supabase
      .from("users_metadata")
      .update({
        credits: userData.credits - 5,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (creditError) {
      console.error("❌ [API] Error deducting credits:", creditError)
      return NextResponse.json({ error: "Error deducting credits: " + creditError.message }, { status: 500 })
    }

    console.log("✅ [API] Credits deducted successfully")

    // Add a record to payment_transactions table
    await supabase.from("payment_transactions").insert({
      user_id: user.id,
      amount: 0, // No money transaction
      credits: 5, // Credits used
      status: "completed",
      provider: "system",
      transaction_type: "debit",
      description: "Cover generation",
    })

    // Return the cover URL and ID
    return NextResponse.json({
      coverUrl,
      coverId,
      message: "Cover generated successfully",
    })
  } catch (error: any) {
    console.error("❌ [API] Unhandled error in generate-cover route:", error)
    return NextResponse.json({ error: "Server error: " + error.message }, { status: 500 })
  }
}
