import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Razorpay from "razorpay"

export async function POST(request: Request) {
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

    // Parse the request body
    const { amount, currency, packageKey, credits } = await request.json()

    // Initialize Razorpay instance on the server
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    })

    // Create an order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit
      currency: currency || "USD",
      receipt: `receipt_order_${Date.now()}`,
    })

    // Return only the order details needed by the client
    // No keys are exposed here
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      packageKey,
      credits,
    })
  } catch (error) {
    console.error("Error creating Razorpay payment:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}
