export function ColoringBookGeneratorSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Coloring Book Generator",
          applicationCategory: "DesignApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Create and download custom coloring books for kids with our free coloring book generator. Make PDF coloring books for 3-7 year olds with Disney-inspired designs.",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "156",
          },
        }),
      }}
    />
  )
}

export function FAQSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is the coloring book generator really free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! You can create and download basic coloring books completely free. We offer premium features for subscribers, but our core generator is free to use.",
              },
            },
            {
              "@type": "Question",
              name: "What format do I receive my coloring book in?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Your coloring book will be delivered as a high-quality PDF file that you can download immediately. This makes it easy to print at home or at a local print shop.",
              },
            },
            {
              "@type": "Question",
              name: "Can I create coloring books for different age groups?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our generator allows you to select complexity levels appropriate for different ages, from simple designs for 3-year-olds to more intricate patterns for older children and adults.",
              },
            },
            {
              "@type": "Question",
              name: "How many pages can I add to my coloring book?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "With the free version, you can create coloring books with up to 10 pages. Premium subscribers can create unlimited jumbo coloring books with as many pages as they want.",
              },
            },
            {
              "@type": "Question",
              name: "Can I upload my own images to turn into coloring pages?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! You can upload your own photos or images, and our AI technology will convert them into line art suitable for coloring.",
              },
            },
          ],
        }),
      }}
    />
  )
}

export function BreadcrumbSchema({ path }: { path: string }) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://drawgle.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Coloring Book Generator",
      item: "https://drawgle.in/coloring-book-generator",
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items,
        }),
      }}
    />
  )
}
