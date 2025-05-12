import { fal } from "@fal-ai/client"
import { MODELS, getImageSize } from "./client"
import type { AspectRatio } from "@/types"

interface GenerateImageOptions {
  prompt: string
  aspectRatio: AspectRatio
  numImages?: number
  model?: "sana" | "flux-schnell"
}

export async function generateImages({
  prompt,
  aspectRatio,
  numImages = 1,
  model = "sana",
}: GenerateImageOptions): Promise<string[]> {
  try {
    const modelId = model === "sana" ? MODELS.SANA : MODELS.FLUX_SCHNELL
    const imageSize = getImageSize(aspectRatio)

    // Enhance the prompt for coloring pages
    const enhancedPrompt = `${prompt}, coloring page style, black and white line art, clean lines, suitable for children, printable`

    // Call FAL.ai API to generate images
    const result = await fal.subscribe(modelId, {
      input: {
        prompt: enhancedPrompt,
        image_size: imageSize,
        num_images: numImages,
        num_inference_steps: model === "sana" ? 25 : 4, // Sana uses more steps by default
      },
      logs: true,
    })

    // Process the result to extract image URLs
    if (!result.data || !result.data.images) {
      throw new Error("No images generated")
    }

    const images = result.data.images.map((img: any) => img.url)
    return images
  } catch (error) {
    console.error("Error generating images:", error)
    throw error
  }
}

// Alternative implementation using queue for long-running requests
export async function queueImageGeneration({
  prompt,
  aspectRatio,
  numImages = 1,
  model = "sana",
}: GenerateImageOptions): Promise<string> {
  try {
    const modelId = model === "sana" ? MODELS.SANA : MODELS.FLUX_SCHNELL
    const imageSize = getImageSize(aspectRatio)

    // Enhance the prompt for coloring pages
    const enhancedPrompt = `${prompt}, coloring page style, black and white line art, clean lines, suitable for children, printable`

    // Submit the request to the queue
    const { request_id } = await fal.queue.submit(modelId, {
      input: {
        prompt: enhancedPrompt,
        image_size: imageSize,
        num_images: numImages,
        num_inference_steps: model === "sana" ? 25 : 4,
      },
    })

    return request_id
  } catch (error) {
    console.error("Error queueing image generation:", error)
    throw error
  }
}

// Function to check the status of a queued request
export async function checkQueueStatus(requestId: string, model: "sana" | "flux-schnell" = "sana"): Promise<any> {
  try {
    const modelId = model === "sana" ? MODELS.SANA : MODELS.FLUX_SCHNELL
    const status = await fal.queue.status(modelId, {
      requestId,
      logs: true,
    })

    return status
  } catch (error) {
    console.error("Error checking queue status:", error)
    throw error
  }
}

// Function to get the result of a completed request
export async function getQueueResult(requestId: string, model: "sana" | "flux-schnell" = "sana"): Promise<string[]> {
  try {
    const modelId = model === "sana" ? MODELS.SANA : MODELS.FLUX_SCHNELL
    const result = await fal.queue.result(modelId, {
      requestId,
    })

    if (!result.data || !result.data.images) {
      throw new Error("No images in result")
    }

    const images = result.data.images.map((img: any) => img.url)
    return images
  } catch (error) {
    console.error("Error getting queue result:", error)
    throw error
  }
}
