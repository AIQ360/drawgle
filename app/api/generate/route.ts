import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { queueImageGeneration } from "@/utils/fal/generate"
import type { GenerateImageParams } from "@/types"

export async function POST(request: Request) {
  try {
    // Get the current user from Supabase
    const supabase = await createClient()

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

    // Determine which model to use (from env or default)
    const modelToUse = process.env.USE_SANA === "true" ? "sana" : "flux-schnell"

    // Queue image generation
    const requestId = await queueImageGeneration({
      prompt: params.prompt,
      aspectRatio: params.aspectRatio,
      numImages: params.numImages,
      model: modelToUse,
    })

    // Return the request ID for polling
    return NextResponse.json({
      requestId,
      model: modelToUse,
      prompt: params.prompt,
      aspectRatio: params.aspectRatio,
      numImages: params.numImages,
    })
  } catch (error: any) {
    console.error("Error queueing image generation:", error)
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
  }
}
