import { type NextRequest, NextResponse } from "next/server"

// Function to get PayPal access token
async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID!
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!

  // Add debug logging
  console.log("PayPal Environment:", process.env.PAYPAL_ENVIRONMENT || "Not set")

  // Determine the correct API base URL based on environment
  const baseUrl =
    process.env.PAYPAL_ENVIRONMENT === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  try {
    const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("PayPal token error:", data)
      throw new Error(`Failed to get access token: ${data.error_description || "Unknown error"}`)
    }

    return data.access_token
  } catch (error) {
    console.error("PayPal token fetch error:", error)
    throw error
  }
}

// Define credit packages
const creditPackages: { [key: string]: { price: number; credits: number } } = {
  starter: { price: 9, credits: 200 },
  access: { price: 18, credits: 500 },
}

// Define available coupons
const couponDatabase: { [key: string]: { discount: number; plans: string[] } } = {
  WELCOME15: { discount: 15, plans: ["starter", "access"] },
}

export async function POST(req: NextRequest) {
  try {
    const { packageKey, userId, couponCode } = await req.json()

    if (!packageKey || !userId) {
      return NextResponse.json({ error: "Missing packageKey or userId" }, { status: 400 })
    }

    const creditPackage = creditPackages[packageKey]
    if (!creditPackage) {
      return NextResponse.json({ error: "Invalid credit package" }, { status: 400 })
    }

    let amount = creditPackage.price
    if (couponCode) {
      const coupon = couponDatabase[couponCode.toUpperCase()]
      if (coupon && coupon.plans.includes(packageKey)) {
        amount = creditPackage.price * (1 - coupon.discount / 100)
      }
    }
    console.log("Server calculated amount:", amount)

    // Determine the correct API base URL based on environment
    const baseUrl =
      process.env.PAYPAL_ENVIRONMENT === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

    try {
      // Get access token
      const accessToken = await getAccessToken()

      // Create order using PayPal Orders API v2
      const response = await fetch(`${baseUrl}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: { currency_code: "USD", value: amount.toFixed(2) },
              custom_id: `${userId}|${packageKey}|${couponCode || ""}`,
            },
          ],
          application_context: {
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/subscription`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/subscription`,
          },
        }),
      })

      const order = await response.json()

      if (!response.ok) {
        console.error("PayPal order creation error response:", order)
        return NextResponse.json(
          {
            error: `Failed to create order: ${order.details?.[0]?.description || response.statusText}`,
            details: order,
          },
          { status: response.status },
        )
      }

      console.log("Order created with ID:", order.id)
      return NextResponse.json({ orderId: order.id }, { status: 200 })
    } catch (error: any) {
      console.error("PayPal order creation error:", error)
      return NextResponse.json(
        {
          error: "Failed to create PayPal order",
          message: error.message || "Unknown error",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Request processing error:", error)
    return NextResponse.json(
      {
        error: "Failed to process request",
        message: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}
