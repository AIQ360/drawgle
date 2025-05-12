// This file is no longer needed since we're using direct generation
// We'll keep it for now to avoid breaking any existing code
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  return NextResponse.json({
    message: "This endpoint is deprecated. Cover generation now happens directly.",
    status: "deprecated",
  })
}
