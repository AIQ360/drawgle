"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { SITE_NAME } from "@/lib/constants"
import { HomeIcon, GalleryHorizontalIcon, CreditCardIcon, GlobeIcon, BookIcon } from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 w-64 border-r bg-pastel-blue/10", className)}>
      <div className="space-y-4 py-4">
       
        <div className="px-4">
          <Link href="/dashboard/create" passHref>
            <Button className="w-full justify-start gap-2 bg-gradient-to-r from-pastel-pink to-pastel-purple">
              <Icons.wand className="h-4 w-4" />
              Create Coloring Pages
            </Button>
          </Link>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Navigation</h2>
          <div className="space-y-1">
            <Link href="/dashboard" passHref>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === "/dashboard" && "bg-accent text-accent-foreground",
                )}
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/gallery" passHref>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === "/dashboard/gallery" && "bg-accent text-accent-foreground",
                )}
              >
                <GalleryHorizontalIcon className="h-4 w-4" />
                My Gallery
              </Button>
            </Link>
            <Link href="/dashboard/books" passHref>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === "/dashboard/books" && "bg-accent text-accent-foreground",
                )}
              >
                <BookIcon className="h-4 w-4" />
                My Books
              </Button>
            </Link>
            <Link href="/gallery" passHref>
              <Button variant="ghost" className={cn("w-full justify-start gap-2")}>
                <GlobeIcon className="h-4 w-4" />
                Public Gallery
              </Button>
            </Link>
            <Link href="/dashboard/subscription" passHref>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === "/dashboard/subscription" && "bg-accent text-accent-foreground",
                )}
              >
                <CreditCardIcon className="h-4 w-4" />
                Subscription
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
