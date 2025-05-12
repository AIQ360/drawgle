import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Image } from "@/types"
import { WebApplicationSchema } from "@/components/seo/schema"

// Add this at the top of your existing component
export default async function DashboardPage() {
  const supabase = await createClient()

  // Use getUser instead of getSession for better security
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/sign-in")
  }

  const { data: userData } = await supabase.from("users_metadata").select("*").eq("id", user.id).single()

  const { data: recentImages } = await supabase
    .from("images")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(4)

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
    <>
      <WebApplicationSchema />
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Welcome back! Create and manage your coloring pages.</p>
          </div>
          <Link href="/dashboard/create" passHref>
            <Button className="bg-gradient-to-r from-pastel-pink to-pastel-purple">Create New Coloring Page</Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userWithMetadata?.credits || 0}</div>
              <p className="text-xs text-muted-foreground">Available credits for generating coloring pages</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userWithMetadata?.subscription_tier || "Free"}</div>
              <p className="text-xs text-muted-foreground">
                {userWithMetadata?.subscription_status === "active" ? "Active subscription" : "No active subscription"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Coloring Pages</h3>
            <Link href="/dashboard/gallery" passHref>
              <Button className="outline">View All</Button>
            </Link>
          </div>

          {recentImages && recentImages.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recentImages.map((image: Image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.prompt}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardFooter className="p-2">
                    <p className="text-xs truncate w-full">{image.prompt}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="mb-4 text-center text-muted-foreground">You haven't created any coloring pages yet.</p>
                <Link href="/dashboard/create" passHref>
                  <Button className="bg-gradient-to-r from-pastel-pink to-pastel-purple">Create Your First Coloring Page</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
