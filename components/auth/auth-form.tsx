"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import Link from "next/link"

interface AuthFormProps {
  view: "sign-in" | "sign-up"
}

export function AuthForm({ view }: AuthFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Add this effect to prevent automatic sign-in after sign-up
  useEffect(() => {
    if (view === "sign-up") {
      // Check if we're in the sign-up view and ensure we're not automatically signed in
      const checkAndSignOut = async () => {
        const { data } = await supabase.auth.getSession()
        if (data.session && !showConfirmation) {
          // If we have a session but haven't shown confirmation, sign out
          await supabase.auth.signOut()
        }
      }

      checkAndSignOut()
    }
  }, [view, supabase, showConfirmation])

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (view === "sign-in") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error

        toast.success("Signed in successfully", {
          description: "Welcome back!",
        })

        router.push("/dashboard")
        router.refresh()
      } else {
        // Sign-up flow
        console.log("Starting sign-up process...")

        // First, sign out any existing session to prevent conflicts
        await supabase.auth.signOut()

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        console.log("Sign-up response:", { data, error })

        if (error) throw error

        // Check if confirmation is required
        if (data?.user?.identities && data.user.identities.length === 0) {
          // User already exists
          console.log("User already exists")
          toast.error("Account already exists", {
            description: "Please check your email for the confirmation link or try signing in.",
          })
          router.push("/sign-in")
          return
        }

        console.log("Sign-up successful, showing confirmation")

        // CRITICAL: Sign out immediately to prevent auto-login
        await supabase.auth.signOut()

        // Redirect to success page instead of showing confirmation in-component
        router.push("/sign-up/success")

        toast.success("Sign up successful", {
          description: "Please check your email for the confirmation link.",
        })
      }
    } catch (error: any) {
      console.error("Authentication error:", error)
      toast.error("Authentication error", {
        description: error.message || "An error occurred during authentication",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: any) {
      console.error("Google auth error:", error)
      toast.error("Google sign in failed", {
        description: error.message || "An error occurred during authentication",
      })
      setIsLoading(false)
    }
  }

  // If showing email confirmation message (this is now a fallback, as we redirect to success page)
  if (showConfirmation) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a confirmation link to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="flex justify-center">
            <Icons.mail className="h-12 w-12 text-primary" />
          </div>
          <p>Please check your email and click the confirmation link to complete your registration.</p>
          <p className="text-sm text-muted-foreground">
            If you don't see the email, check your spam folder or try signing in.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              // Navigate manually without router.push to avoid errors
              window.location.href = "/sign-in"
            }}
          >
            Go to Sign In
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {view === "sign-in" ? "Welcome Back!" : "Create an Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {view === "sign-in" ? "Sign in to your account to continue" : "Sign up to start creating coloring pages"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                {view === "sign-in" ? "Signing In..." : "Signing Up..."}
              </>
            ) : view === "sign-in" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" type="button" className="w-full" onClick={handleGoogleAuth} disabled={isLoading}>
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </>
          )}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {view === "sign-in" ? "Don't have an account? " : "Already have an account? "}
          <Link href={view === "sign-in" ? "/sign-up" : "/sign-in"} className="text-primary hover:underline">
            {view === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
