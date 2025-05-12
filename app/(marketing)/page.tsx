import type { Metadata } from "next"
import { SITE_URL } from "@/lib/constants"
import { WebApplicationSchema } from "@/components/seo/schema"
import { MarketingPageClient } from "./MarketingPageClient"
import { WebsiteSchema } from "@/components/seo/schema"

export const metadata: Metadata = {
  title: "Create Custom Coloring Pages with AI | Drawgle",
  description:
    "Turn any idea or photo into a beautiful coloring page in seconds with our AI generator. Perfect for parents, teachers, and kids. Get 5 free pages today!",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Create Custom Coloring Pages with AI | Drawgle",
    description:
      "Turn any idea or photo into a beautiful coloring page in seconds with our AI generator. Perfect for parents, teachers, and kids. Get 5 free pages today!",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image-home.jpg`,
        width: 1200,
        height: 630,
        alt: "Drawgle - AI Coloring Page Generator",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <WebsiteSchema
        title="Create Custom Coloring Pages with AI | Drawgle"
        description="Turn any idea or photo into a beautiful coloring page in seconds with our AI generator. Perfect for parents, teachers, and kids."
        path="/"
      />
      <MarketingPageClient />
      <WebApplicationSchema />
    </>
  )
}
