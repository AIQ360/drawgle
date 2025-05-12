import Link from "next/link"
import { SITE_NAME } from "@/lib/constants"
import { Icons } from "@/components/icons"
import { Pencil, Palette, Sparkles, Stars } from "lucide-react"

export default function PublicFooter() {
  const coloringCategories = [
    { name: "For Kids", href: "/coloring-pages-for-kids" },
    { name: "Christmas", href: "/christmas-coloring-pages" },
    { name: "Halloween", href: "/halloween-coloring-pages" },
    { name: "Unicorn", href: "/unicorn-coloring-pages" },
    { name: "Pokemon", href: "/pokemon-coloring-pages" },
    { name: "Cute", href: "/cute-coloring-pages" },
    { name: "Adult", href: "/adult-coloring-pages" },
    { name: "Printable", href: "/printable-coloring-pages" },
    { name: "Free", href: "/free-coloring-pages" },
    { name: "Hello Kitty", href: "/hello-kitty-coloring-pages" },
    { name: "Bluey", href: "/bluey-coloring-pages" },
    { name: "Sonic", href: "/sonic-coloring-pages" },
    { name: "Spiderman", href: "/spiderman-coloring-pages" },
    { name: "Coloring Book Generator", href: "/coloring-book-generator" },
  ]

  return (
    <footer className="relative border-t bg-gradient-to-b from-background to-background/95 overflow-hidden">
      {/* Playful background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Colorful dots scattered around */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: [
                "#FF5252",
                "#FF4081",
                "#E040FB",
                "#7C4DFF",
                "#536DFE",
                "#448AFF",
                "#40C4FF",
                "#18FFFF",
                "#64FFDA",
                "#69F0AE",
                "#B2FF59",
                "#EEFF41",
                "#FFFF00",
                "#FFD740",
                "#FFAB40",
                "#FF6E40",
              ][Math.floor(Math.random() * 16)],
            }}
          />
        ))}

        {/* Pencil outlines */}
        <div className="absolute -bottom-20 -left-20 w-40 h-40 opacity-5">
          <Pencil className="w-full h-full text-foreground" strokeWidth={1} />
        </div>
        <div className="absolute -top-20 -right-20 w-40 h-40 opacity-5 rotate-45">
          <Pencil className="w-full h-full text-foreground" strokeWidth={1} />
        </div>

        {/* Large watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[20vw] font-extrabold tracking-tighter text-gray-200/15 select-none">{SITE_NAME}</div>
        </div>
      </div>

      <div className="container py-12 relative z-10">


        {/* Coloring pages section - with playful design */}
        <div className="relative mb-16 p-8 rounded-2xl border border-primary/10 bg-primary/5 backdrop-blur-sm">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-background px-4 py-2 rounded-full border border-primary/20">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Coloring Categories</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {coloringCategories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="px-4 py-2 bg-background hover:bg-primary/10 text-sm rounded-full transition-all duration-300 border border-primary/10 hover:border-primary/30 hover:text-foreground text-muted-foreground hover:shadow-sm hover:-translate-y-0.5"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Main footer content with playful dividers */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="relative">
                <Icons.logo className="h-10 w-10" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>
              <span className="text-2xl font-bold tracking-tight">{SITE_NAME}</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Create beautiful coloring pages for kids with AI. Perfect for parents, teachers, and creative minds.
            </p>
            <div>
              <Link
                href="https://x.com/AiNotSoSmart"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="p-2 rounded-full bg-background border border-border group-hover:border-primary/50 transition-colors">
                  <Icons.twitter className="h-4 w-4" />
                </div>
                <span className="group-hover:underline underline-offset-4">@AiNotSoSmart</span>
              </Link>
            </div>
          </div>

          {/* Quick links with playful indicators */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/80" />
              Product
            </h3>
            <ul className="space-y-3 pl-3 border-l border-primary/10">
              <li>
                <Link
                  href="/about-us"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/80" />
              Resources
            </h3>
            <ul className="space-y-3 pl-3 border-l border-primary/10">
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/80" />
              Legal
            </h3>
            <ul className="space-y-3 pl-3 border-l border-primary/10">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright section with playful divider */}
        <div className="mt-16 pt-6 border-t border-dashed border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary/40" />
            <p className="text-sm text-muted-foreground">Made with ❤️ for creative minds</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
