import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    // Get the current user from Supabase
    const supabase = createClient()

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
    const { credits, description } = await request.json()

    if (!credits || credits <= 0) {
      return NextResponse.json({ error: "Invalid credit amount" }, { status: 400 })
    }

    // Check if user has enough credits
    if (userData.credits < credits) {
      return NextResponse.json({ error: "Not enough credits" }, { status: 400 })
    }

    // Deduct credits from the user's account
    const { error: updateError } = await supabase
      .from("users_metadata")
      .update({
        credits: userData.credits - credits,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id)

    if (updateError) {
      console.error("Error updating user credits:", updateError)
      return NextResponse.json({ error: "Failed to update credits" }, { status: 500 })
    }

    // Add a record to payment_transactions table
    await supabase.from("payment_transactions").insert({
      user_id: session.user.id,
      amount: 0, // No money transaction
      credits: credits, // Credits used
      status: "completed",
      provider: "system",
      transaction_type: "debit",
      description: description || "Credit usage",
    })

    return NextResponse.json({
      success: true,
      creditsRemaining: userData.credits - credits,
    })
  } catch (error: any) {
    console.error("Error deducting credits:", error)
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
  }
}
