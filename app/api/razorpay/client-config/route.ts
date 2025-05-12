import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    // Get the supabase client
    const supabase = createClient()

    // Get session to verify the user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Return only the public key as JSON
    return NextResponse.json({
      publicKey: process.env.RAZORPAY_PUBLIC_KEY,
    })
  } catch (error) {
    console.error("Error fetching Razorpay config:", error)
    return NextResponse.json({ error: "Failed to load Razorpay configuration" }, { status: 500 })
  }
}
