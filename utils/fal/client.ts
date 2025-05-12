import { fal } from "@fal-ai/client"
import type { AspectRatio } from "@/types"

// Configure the FAL client with API key
if (process.env.FAL_API_KEY) {
  fal.config({
    credentials: process.env.FAL_API_KEY,
  })
}

// Model IDs
export const MODELS = {
  SANA: "fal-ai/sana",
  FLUX_SCHNELL: "fal-ai/flux/schnell",
  IDEOGRAM: "fal-ai/ideogram/v2a/turbo",
}

// Helper function to convert aspect ratio to width and height
export function getImageDimensions(aspectRatio: AspectRatio): { width: number; height: number } {
  switch (aspectRatio) {
    case "square":
      return { width: 1024, height: 1024 }
    case "portrait":
      return { width: 768, height: 1024 }
    case "landscape":
      return { width: 1024, height: 768 }
    default:
      return { width: 1024, height: 1024 }
  }
}

// Helper function to convert dimensions to FAL image_size format
export function getImageSize(aspectRatio: AspectRatio): string | { width: number; height: number } {
  switch (aspectRatio) {
    case "square":
      return "square_hd"
    case "portrait":
      return "portrait_4_3"
    case "landscape":
      return "landscape_4_3"
    default:
      return "square_hd"
  }
}
