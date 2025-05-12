"use server"

import { createClient } from "@/lib/supabase/server"
import { type SubscriptionTier, SUBSCRIPTION_PLANS } from "@/lib/subscription-plans"

export async function updateSubscription(tier: SubscriptionTier) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      throw new Error("Authentication required")
    }

    // Get the credits for the selected tier
    const credits = SUBSCRIPTION_PLANS[tier].credits

    // Update the user's subscription in the database
    const { error } = await supabase
      .from("users_metadata")
      .update({
        subscription_tier: tier,
        subscription_status: tier === "free" ? "inactive" : "active",
        credits: credits,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) {
      throw error
    }

    // Add subscription record
    await supabase.from("subscriptions").upsert(
      {
        user_id: user.id,
        plan_id: tier,
        status: tier === "free" ? "inactive" : "active",
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      },
      {
        onConflict: "user_id",
      },
    )

    return { success: true, message: `Subscription updated to ${SUBSCRIPTION_PLANS[tier].name} plan` }
  } catch (error: any) {
    console.error("Error updating subscription:", error)
    return {
      success: false,
      error: error.message || "Failed to update subscription",
    }
  }
}

// For demo purposes - add credits to user account
export async function addDemoCredits(amount = 20) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      throw new Error("Authentication required")
    }

    // Get current user metadata
    const { data: userData, error: userError } = await supabase
      .from("users_metadata")
      .select("credits")
      .eq("id", user.id)
      .single()

    if (userError) {
      throw userError
    }

    // Update credits
    const newCredits = (userData?.credits || 0) + amount
    const { error } = await supabase
      .from("users_metadata")
      .update({
        credits: newCredits,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) {
      throw error
    }

    return { success: true, credits: newCredits }
  } catch (error: any) {
    console.error("Error adding demo credits:", error)
    return {
      success: false,
      error: error.message || "Failed to add credits",
    }
  }
}
