import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import PricingTable from "@/components/payment/pricing-table"

export default async function SubscriptionPage() {
  const supabase = createClient()

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect("/sign-in")
    }

    const { data: profile } = await supabase.from("profiles").select("id, credits").eq("id", session.user.id).single()

    return (
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Your Subscription</h1>
          <p className="text-gray-600 mb-2">
            You currently have <span className="font-semibold">{profile?.credits || 0}</span> credits.
          </p>
        </div>

        <PricingTable userId={session.user.id} />
      </div>
    )
  } catch (error) {
    console.error("Error in subscription page:", error)
    redirect("/sign-in")
  }
}
