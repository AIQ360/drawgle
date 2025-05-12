import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = "USD" } = await req.json()

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 })
    }

    // Convert amount to smallest currency unit (cents for USD)
    const amountInSmallestUnit = Math.round(amount * 100)

    // Create Razorpay order
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amountInSmallestUnit,
        currency,
        receipt: `receipt_${Date.now()}`,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.description || "Failed to create Razorpay order")
    }

    return NextResponse.json({
      orderId: data.id,
    })
  } catch (error: any) {
    console.error("Razorpay order creation error:", error)
    return NextResponse.json({ error: error.message || "Failed to create Razorpay order" }, { status: 500 })
  }
}
