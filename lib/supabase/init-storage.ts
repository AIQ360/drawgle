"use server"

import { createClient } from "./server"

export async function initializeStorage() {
  const supabase = createClient()

  try {
    // Check if the bucket exists
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.some((bucket) => bucket.name === "coloring-pages")

    // Create the bucket if it doesn't exist
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket("coloring-pages", {
        public: true,
        allowedMimeTypes: ["image/png", "image/jpeg"],
        fileSizeLimit: 5242880, // 5MB
      })

      if (error) throw error

      console.log("Created coloring-pages bucket")
    }

    return { success: true }
  } catch (error) {
    console.error("Error initializing storage:", error)
    return { success: false, error }
  }
}
