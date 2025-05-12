import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Toaster } from "@/components/ui/toaster"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Use getUser instead of getSession for better security
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/sign-in")
  }

  const { data: userData } = await supabase.from("users_metadata").select("*").eq("id", user.id).single()

  const userWithMetadata = userData
    ? {
        id: user.id,
        email: user.email || "",
        credits: userData.credits,
        subscription_tier: userData.subscription_tier,
        subscription_status: userData.subscription_status,
      }
    : null

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={userWithMetadata} />
      <div className="flex flex-1">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
