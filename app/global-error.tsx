"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-6 px-4 py-8 md:px-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-4xl font-bold">Something went wrong</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                We apologize for the inconvenience. Please try again or contact support if the problem persists.
              </p>
            </div>
            <Button onClick={reset}>Try Again</Button>
          </div>
        </div>
      </body>
    </html>
  )
}
