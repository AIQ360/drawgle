import type React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItemProps {
  label: string
  href: string
  active?: boolean
}

export const BreadcrumbItem = ({ label, href, active }: BreadcrumbItemProps) => {
  if (active) {
    return (
      <span className="font-medium text-purple-800" aria-current="page">
        {label}
      </span>
    )
  }
  return (
    <Link href={href} className="hover:text-purple-600 transition-colors">
      {label}
    </Link>
  )
}

export const BreadcrumbSeparator = () => {
  return <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
}

export const BreadcrumbList = ({ children }: { children: React.ReactNode }) => {
  return <ol className="flex flex-wrap items-center text-sm text-gray-500">{children}</ol>
}

export const BreadcrumbPage = () => {
  return (
    <Link href="/" className="flex items-center hover:text-purple-600 transition-colors">
      <Home className="h-4 w-4" />
      <span className="sr-only">Home</span>
    </Link>
  )
}

interface BreadcrumbProps {
  items: BreadcrumbItemProps[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 md:px-6">
      <BreadcrumbList>
        <li className="flex items-center">
          <BreadcrumbPage />
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <BreadcrumbSeparator />
            <BreadcrumbItem label={item.label} href={item.href} active={item.active} />
          </li>
        ))}
      </BreadcrumbList>
    </nav>
  )
}

export const BreadcrumbEllipsis = () => {
  return <span>...</span>
}
