import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-8 md:px-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl">Oops! The page you're looking for doesn't exist.</p>
        </div>
        <Link href="/" passHref>
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  )
}
