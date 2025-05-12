import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature, amount, userId, credits } = await req.json()

    // Verify the payment signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${orderCreationId}|${razorpayPaymentId}`)
      .digest("hex")

    const isAuthentic = expectedSignature === razorpaySignature

    if (!isAuthentic) {
      return NextResponse.json({ isOk: false, message: "Payment verification failed" }, { status: 400 })
    }

    // Update user credits in the database
    const supabase = await createClient()

    // Get current user credits
    const { data: userData, error: userError } = await supabase
      .from("users_metadata")
      .select("credits")
      .eq("id", userId)
      .single()

    if (userError) {
      throw new Error(`Error fetching user data: ${userError.message}`)
    }

    // Update credits
    const newCredits = (userData?.credits || 0) + credits
    const { error: updateError } = await supabase
      .from("users_metadata")
      .update({ credits: newCredits })
      .eq("id", userId)

    if (updateError) {
      throw new Error(`Error updating credits: ${updateError.message}`)
    }

    // Record the transaction
    const { error: transactionError } = await supabase.from("payment_transactions").insert({
      user_id: userId,
      payment_method: "razorpay",
      amount: amount,
      credits: credits,
      order_id: orderCreationId,
      payment_id: razorpayPaymentId,
      status: "completed",
    })

    if (transactionError) {
      console.error("Error recording transaction:", transactionError)
      // Continue even if transaction recording fails
    }

    return NextResponse.json({
      isOk: true,
      message: "Payment verified successfully",
    })
  } catch (error: any) {
    console.error("Razorpay verification error:", error)
    return NextResponse.json({ isOk: false, message: error.message || "Payment verification failed" }, { status: 500 })
  }
}
