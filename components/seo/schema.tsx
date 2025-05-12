"use client"

import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants"

// Main Website Schema - to be used sitewide in layout.tsx
export function WebsiteSchema() {
  const coloringPages = [
    { name: "Coloring Pages for Kids", url: "/coloring-pages-for-kids" },
    { name: "Christmas Coloring Pages", url: "/christmas-coloring-pages" },
    { name: "Halloween Coloring Pages", url: "/halloween-coloring-pages" },
    { name: "Unicorn Coloring Pages", url: "/unicorn-coloring-pages" },
    { name: "Pokemon Coloring Pages", url: "/pokemon-coloring-pages" },
    { name: "Cute Coloring Pages", url: "/cute-coloring-pages" },
    { name: "Adult Coloring Pages", url: "/adult-coloring-pages" },
    { name: "Printable Coloring Pages", url: "/printable-coloring-pages" },
    { name: "Free Coloring Pages", url: "/free-coloring-pages" },
    { name: "Coloring Book Generator", url: "/coloring-book-generator" },
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    hasPart: coloringPages.map((page) => ({
      "@type": "WebPage",
      name: page.name,
      url: `${SITE_URL}${page.url}`,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// WebApplication Schema - to be used on homepage
export function WebApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    screenshot: `${SITE_URL}/text-to-coloring-demo.png`,
    featureList: "AI-powered coloring page generation, photo-to-coloring page conversion, custom coloring books",
    softwareVersion: "1.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// WebPage Schema - for individual pages
export function SchemaWebPage({
  name,
  description,
  path = "",
  type = "WebPage",
  imageUrl = `${SITE_URL}/og-image.jpg`,
}: {
  name: string
  description: string
  path?: string
  type?: string
  imageUrl?: string
}) {
  const url = `${SITE_URL}${path}`

  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    name: name,
    description: description,
    url: url,
    image: imageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// FAQ Schema
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// Article Schema
export function ArticleSchema({
  title,
  description,
  path,
  imageUrl,
  datePublished,
  dateModified,
  authorName = "Drawgle Team",
}: {
  title: string
  description: string
  path: string
  imageUrl: string
  datePublished: string
  dateModified?: string
  authorName?: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}`,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
