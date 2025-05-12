import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const creditPackages: { [key: string]: { price: number; credits: number } } = {
  starter: { price: 9, credits: 200 },
  access: { price: 18, credits: 500 },
}

const couponDatabase: { [key: string]: { discount: number; plans: string[] } } = {
  WELCOME15: { discount: 15, plans: ["starter", "access"] },
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  try {
    const { orderId, payerId, amount, packageKey, couponCode } = await request.json()
    console.log("Processing PayPal payment:", { orderId, payerId, amount, packageKey, couponCode })

    if (!orderId || !payerId || amount === undefined || !packageKey) {
      return NextResponse.json({ message: "Missing required details" }, { status: 400 })
    }

    const creditPackage = creditPackages[packageKey]
    if (!creditPackage) {
      return NextResponse.json({ message: "Invalid credit package" }, { status: 400 })
    }

    let expectedAmount = creditPackage.price
    if (couponCode) {
      const coupon = couponDatabase[couponCode.toUpperCase()]
      if (coupon && coupon.plans.includes(packageKey)) {
        expectedAmount = creditPackage.price * (1 - coupon.discount / 100)
      }
    }

    // Allow for small floating point differences
    if (Math.abs(amount - expectedAmount) > 0.01) {
      return NextResponse.json({ message: "Amount mismatch" }, { status: 400 })
    }

    const creditsPurchased = creditPackage.credits

    // Get the current user's metadata
    const { data: userData, error: userError } = await supabase
      .from("users_metadata")
      .select("*")
      .eq("id", payerId)
      .single()

    if (userError) {
      console.error("Error fetching user metadata:", userError)

      // Try profiles table as fallback
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", payerId)
        .single()

      if (profileError) {
        console.error("Error fetching profile data:", profileError)
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      // Update credits in profiles table
      const newCredits = (profileData?.credits || 0) + creditsPurchased
      const { error: updateError } = await supabase.from("profiles").update({ credits: newCredits }).eq("id", payerId)

      if (updateError) {
        console.error("Error updating credits in profiles:", updateError)
        return NextResponse.json({ message: "Failed to update credits" }, { status: 500 })
      }

      // Record the transaction - fix the schema issue by checking columns first
      try {
        const { error: transactionError } = await supabase.from("payment_transactions").insert({
          user_id: payerId,
          payment_method: "paypal",
          amount: amount,
          credits: creditsPurchased,
          order_id: orderId,
          status: "completed",
          // Remove coupon_code field as it doesn't exist in the schema
        })

        if (transactionError) {
          console.error("Error recording transaction:", transactionError)
          // Continue even if transaction recording fails
        }
      } catch (err) {
        console.error("Failed to insert transaction record:", err)
        // Continue even if transaction recording fails
      }

      return NextResponse.json({
        message: "Credits updated successfully",
        creditsPurchased,
      })
    }

    // Update the user's credits in users_metadata
    const newCredits = userData.credits + creditsPurchased
    const { error: updateError } = await supabase
      .from("users_metadata")
      .update({ credits: newCredits })
      .eq("id", payerId)

    if (updateError) {
      console.error("Error updating credits:", updateError)
      return NextResponse.json({ message: "Failed to update credits" }, { status: 500 })
    }

    // Record the transaction without the coupon_code field
    try {
      const { error: transactionError } = await supabase.from("payment_transactions").insert({
        user_id: payerId,
        payment_method: "paypal",
        amount: amount,
        credits: creditsPurchased,
        order_id: orderId,
        status: "completed",
        // Remove coupon_code field as it doesn't exist in the schema
      })

      if (transactionError) {
        console.error("Error recording transaction:", transactionError)
        // Continue even if transaction recording fails
      }
    } catch (err) {
      console.error("Failed to insert transaction record:", err)
      // Continue even if transaction recording fails
    }

    return NextResponse.json({
      message: "Credits updated successfully",
      creditsPurchased,
    })
  } catch (error: any) {
    console.error("PayPal webhook error:", error)
    return NextResponse.json({ message: "Error processing payment", error: error.message }, { status: 500 })
  }
}
