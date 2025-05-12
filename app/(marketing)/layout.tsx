import type React from "react"
import PublicHeader from "@/components/layouts/public-header"
import PublicFooter from "@/components/layouts/public-footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  )
}
