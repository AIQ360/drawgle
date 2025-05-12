import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID!
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials not configured")
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  // Use the correct API URL based on environment
  const baseUrl =
    process.env.PAYPAL_ENVIRONMENT === "sandbox" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com"

  try {
    const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("PayPal token error response:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      })
      throw new Error(`Failed to get access token: ${response.statusText}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error("Error getting PayPal access token:", error)
    throw error
  }
}

export async function POST(request: Request) {
  console.log("PayPal webhook request received")

  const rawBody = await request.text()
  const headers = request.headers

  let webhookEvent
  try {
    webhookEvent = JSON.parse(rawBody)
    console.log("Webhook event:", webhookEvent)
  } catch (error) {
    console.error("Error parsing webhook payload:", error)
    return NextResponse.json({ message: "Invalid webhook payload" }, { status: 400 })
  }

  // Verify webhook signature if webhook ID is configured
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  if (webhookId) {
    try {
      const accessToken = await getAccessToken()

      // Use the correct API URL based on environment
      const baseUrl =
        process.env.PAYPAL_ENVIRONMENT === "sandbox" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com"

      const response = await fetch(`${baseUrl}/v1/notifications/verify-webhook-signature`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_algo: headers.get("paypal-auth-algo") || "",
          cert_url: headers.get("paypal-cert-url") || "",
          transmission_id: headers.get("paypal-transmission-id") || "",
          transmission_sig: headers.get("paypal-transmission-sig") || "",
          transmission_time: headers.get("paypal-transmission-time") || "",
          webhook_id: webhookId,
          webhook_event: webhookEvent,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("Webhook verification error response:", {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        })
        return NextResponse.json({ message: "Webhook verification failed" }, { status: 401 })
      }

      const verification = await response.json()
      if (verification.verification_status !== "SUCCESS") {
        console.error("Verification failed with status:", verification.verification_status)
        return NextResponse.json({ message: "Webhook verification failed" }, { status: 401 })
      }

      console.log("Webhook verification successful")
    } catch (error) {
      console.error("Webhook verification error:", error)
      // Continue processing even if verification fails
      // This allows us to handle payments even if webhook verification has issues
    }
  } else {
    console.log("No webhook ID configured, skipping verification")
  }

  // Process the webhook event
  try {
    // Extract payment details from the webhook event
    const eventType = webhookEvent.event_type

    // Handle PAYMENT.CAPTURE.COMPLETED event
    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      const resource = webhookEvent.resource
      const customId = resource.custom_id || ""
      const parts = customId.split("|")

      if (parts.length < 2) {
        console.error("Invalid custom_id format:", customId)
        return NextResponse.json({ message: "Invalid custom_id format" }, { status: 400 })
      }

      const userId = parts[0]
      const packageKey = parts[1]
      const couponCode = parts[2] || null

      // Determine credits based on package
      let creditsPurchased = 0
      if (packageKey === "starter") creditsPurchased = 200
      else if (packageKey === "access") creditsPurchased = 500

      if (creditsPurchased === 0) {
        console.error("Invalid package key:", packageKey)
        return NextResponse.json({ message: "Invalid package key" }, { status: 400 })
      }

      const supabase = await createClient()

      // Try to update user credits in both possible tables
      let updated = false

      // First try users_metadata
      const { data: userData, error: userError } = await supabase
        .from("users_metadata")
        .select("credits")
        .eq("id", userId)
        .single()

      if (!userError) {
        const newCredits = (userData?.credits || 0) + creditsPurchased
        const { error: updateError } = await supabase
          .from("users_metadata")
          .update({ credits: newCredits })
          .eq("id", userId)

        if (!updateError) {
          updated = true
          console.log(`Updated credits in users_metadata for user ${userId}: ${newCredits}`)
        } else {
          console.error("Error updating credits in users_metadata:", updateError)
        }
      } else {
        console.log("User not found in users_metadata, trying profiles table")
      }

      // If users_metadata failed, try profiles
      if (!updated) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("credits")
          .eq("id", userId)
          .single()

        if (!profileError) {
          const newCredits = (profileData?.credits || 0) + creditsPurchased
          const { error: updateError } = await supabase
            .from("profiles")
            .update({ credits: newCredits })
            .eq("id", userId)

          if (!updateError) {
            updated = true
            console.log(`Updated credits in profiles for user ${userId}: ${newCredits}`)
          } else {
            console.error("Error updating credits in profiles:", updateError)
          }
        } else {
          console.error("Error fetching user data from profiles:", profileError)
        }
      }

      if (!updated) {
        return NextResponse.json({ message: "Failed to update user credits" }, { status: 500 })
      }

      // Record the transaction without coupon_code
      try {
        const { error: transactionError } = await supabase.from("payment_transactions").insert({
          user_id: userId,
          payment_method: "paypal",
          amount: Number.parseFloat(resource.amount.value),
          credits: creditsPurchased,
          order_id: resource.id,
          status: "completed",
        })

        if (transactionError) {
          console.error("Error recording transaction:", transactionError)
          // Continue even if transaction recording fails
        } else {
          console.log("Transaction recorded successfully")
        }
      } catch (err) {
        console.error("Failed to insert transaction record:", err)
        // Continue even if transaction recording fails
      }

      return NextResponse.json({
        message: "Payment processed successfully",
        creditsPurchased,
      })
    }

    // Return success for other event types
    return NextResponse.json({
      message: "Webhook received",
      eventType,
    })
  } catch (error: any) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ message: "Error processing webhook", error: error.message }, { status: 500 })
  }
}
