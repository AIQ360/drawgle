import { fal } from "@fal-ai/client"

// Set up Fal AI client
if (process.env.FAL_API_KEY) {
  fal.config({
    credentials: process.env.FAL_API_KEY,
  })
}

const IDEOGRAM_MODEL = "fal-ai/ideogram/v2a/turbo"

interface GenerateCoverOptions {
  prompt: string
  style?: string
  userId: string
}

export async function generateCover({ prompt, style = "auto", userId }: GenerateCoverOptions): Promise<string> {
  console.log("Generating cover with prompt:", prompt)
  try {
    // Generate the cover using Fal AI
    const result = await fal.subscribe(IDEOGRAM_MODEL, {
      input: {
        prompt,
        aspect_ratio: "3:4", // Book cover ratio
        expand_prompt: true,
        style,
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log("Generation in progress:", update.logs?.map((log) => log.message) || [])
      },
    })

    console.log("Cover generation completed:", result)

    // Check if we have images in the result
    if (!result.data?.images || result.data.images.length === 0) {
      throw new Error("No images in result")
    }

    // Get the image URL
    const imageUrl = result.data.images[0].url
    console.log("Image URL:", imageUrl)

    return imageUrl
  } catch (error: any) {
    console.error("Error generating cover:", error)
    throw error
  }
}
