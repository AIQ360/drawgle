import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Drawgle</span>
        </Link>
        <nav className="flex gap-4">
          <Link href="/sign-up" passHref>
            <Button variant="ghost">Sign Up</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Welcome to Drawgle</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign in to your account to create beautiful coloring pages for kids.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-4">
              <AuthForm view="sign-in" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
