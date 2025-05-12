import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Baloo_2 } from "next/font/google"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { ThemeProvider } from "@/components/theme-provider"
import { AppInitializer } from "@/components/app-initializer"
import { SonnerProvider } from "@/components/sonner-provider"
import { WebsiteSchema } from "@/components/seo/schema"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - AI Coloring Page Generator for Kids and Families`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Create custom coloring pages from text or photos in seconds. Perfect for parents, teachers, and kids. Try our AI coloring page generator for free today!",
  keywords: [
    "coloring pages",
    "AI coloring",
    "custom coloring pages",
    "kids activities",
    "educational coloring",
    "coloring books",
    "text to coloring",
    "photo to coloring",
  ],
  authors: [{ name: "Drawgle Team" }],
  creator: "Drawgle",
  publisher: "Drawgle",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${SITE_NAME} - AI Coloring Page Generator for Kids and Families`,
    description:
      "Create custom coloring pages from text or photos in seconds. Perfect for parents, teachers, and kids. Try our AI coloring page generator for free today!",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Drawgle - AI Coloring Page Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - AI Coloring Page Generator for Kids and Families`,
    description:
      "Create custom coloring pages from text or photos in seconds. Perfect for parents, teachers, and kids. Try our AI coloring page generator for free today!",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <WebsiteSchema />
      </head>
      <body className={`${inter.variable} ${baloo.variable} font-baloo`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <SonnerProvider />
          <AppInitializer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
