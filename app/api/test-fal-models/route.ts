import { NextResponse } from "next/server"
import { fal } from "@fal-ai/client"

// Configure the FAL client with API key
if (process.env.FAL_API_KEY) {
  fal.config({
    credentials: process.env.FAL_API_KEY,
  })
}

export async function GET(request: Request) {
  try {
    console.log("🔍 [TEST] Testing Fal AI models access")

    const models = ["fal-ai/sana", "fal-ai/flux/schnell", "fal-ai/ideogram/v2a/turbo"]

    const results = {}

    for (const model of models) {
      try {
        console.log(`🔍 [TEST] Testing access to model: ${model}`)

        // Try to get model info (this will fail if unauthorized)
        await fal.subscribe(model, {
          input: {},
          pollInterval: 1000,
          onQueueUpdate: () => {},
        })

        results[model] = "Access granted"
        console.log(`✅ [TEST] Access granted to model: ${model}`)
      } catch (error: any) {
        results[model] = `Error: ${error.message}`
        console.log(`❌ [TEST] Access denied to model: ${model}. Error: ${error.message}`)
      }
    }

    return NextResponse.json({
      apiKeyConfigured: !!process.env.FAL_API_KEY,
      models: results,
    })
  } catch (error: any) {
    console.error("❌ [TEST] Error testing Fal AI models:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
