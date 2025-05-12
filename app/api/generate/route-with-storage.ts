import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { generateImages } from "@/lib/fal/generate"
import { uploadImageToStorage } from "@/lib/supabase/storage"
import type { GenerateImageParams } from "@/types"

export async function POST(request: Request) {
  try {
    // Get the current user from Supabase
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user metadata
    const { data: userData } = await supabase.from("users_metadata").select("*").eq("id", session.user.id).single()

    if (!userData) {
      return NextResponse.json({ error: "User metadata not found" }, { status: 404 })
    }

    // Parse request body
    const params: GenerateImageParams = await request.json()

    // Check if user has enough credits
    if (userData.credits < params.numImages) {
      return NextResponse.json({ error: "Not enough credits" }, { status: 400 })
    }

    // Generate images using FAL.ai
    const generatedImages = await generateImages({
      prompt: params.prompt,
      aspectRatio: params.aspectRatio,
      numImages: params.numImages,
    })

    // Upload images to Supabase Storage and get public URLs
    const storedImages = await Promise.all(
      generatedImages.map(async (imageUrl) => {
        return await uploadImageToStorage(imageUrl, session.user.id, params.prompt)
      }),
    )

    // Store images in database
    for (const imageUrl of storedImages) {
      await supabase.from("images").insert({
        user_id: session.user.id,
        prompt: params.prompt,
        image_url: imageUrl,
        aspect_ratio: params.aspectRatio,
        model: process.env.USE_SANA === "true" ? "sana" : "flux-schnell",
      })
    }

    // Update user credits
    await supabase
      .from("users_metadata")
      .update({ credits: userData.credits - params.numImages })
      .eq("id", session.user.id)

    // Return the generated images
    return NextResponse.json({ images: storedImages })
  } catch (error: any) {
    console.error("Error generating images:", error)
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
  }
}
