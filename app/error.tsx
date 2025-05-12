"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-8 md:px-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl">
            We apologize for the inconvenience. Please try again or contact support if the problem persists.
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Link href="/" passHref>
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
