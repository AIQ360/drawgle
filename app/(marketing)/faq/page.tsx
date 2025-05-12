import type { Metadata } from "next"
import { WebsiteSchema, FAQSchema } from "@/components/seo/schema"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Frequently Asked Questions About Drawgle Coloring Pages",
  description:
    "Find answers to common questions about creating custom coloring pages, subscription plans, and using Drawgle's AI coloring page generator.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: "Frequently Asked Questions About Drawgle Coloring Pages",
    description:
      "Find answers to common questions about creating custom coloring pages, subscription plans, and using Drawgle's AI coloring page generator.",
    url: `${SITE_URL}/faq`,
  },
}

// Define FAQs for both display and schema
const faqs = [
  {
    question: "What is Drawgle?",
    answer:
      "Drawgle is an AI-powered coloring page generator that allows you to create custom coloring pages from text descriptions or by uploading your own photos. It's perfect for parents, teachers, and anyone looking for unique coloring activities.",
  },
  {
    question: "How many coloring pages can I create?",
    answer:
      "The number of coloring pages you can create depends on your subscription plan. Free accounts get 5 pages per month, while paid plans offer between 200-500 pages monthly.",
  },
  {
    question: "How do I create a coloring page?",
    answer:
      "There are two ways to create coloring pages: 1) Text to Coloring Page: Simply type a description of what you want, and our AI will generate a coloring page based on your description. 2) Photo to Coloring Page: Upload a photo, and our AI will convert it into a line art coloring page.",
  },
  {
    question: "What age range are these coloring pages suitable for?",
    answer:
      "Our coloring pages are designed to be suitable for children of all ages. You can create simpler designs for younger children and more complex ones for older kids and adults. The level of detail can be adjusted through your prompts or image selections.",
  },
  {
    question: "Can I download and print the coloring pages?",
    answer:
      "Yes, all coloring pages can be downloaded as high-quality PNG files that are ready to print. You can print them at home or at any print shop. The pages are optimized for standard letter/A4 size paper.",
  },
  {
    question: "What is a coloring book?",
    answer:
      "A coloring book is a collection of multiple coloring pages organized into a downloadable PDF. You can create custom coloring books by selecting multiple images from your gallery and arranging them in the order you prefer. This feature is available on all paid subscription plans.",
  },
  {
    question: "How do credits work?",
    answer:
      "Credits are used to generate coloring pages. Each coloring page you create uses 1 credit. Credits are replenished monthly based on your subscription plan. Unused credits do not roll over to the next month.",
  },
  {
    question: "Can I share my coloring pages with others?",
    answer:
      "Yes! You can share your coloring pages in several ways: download and print them for personal use, make them public in our gallery for others to see and use, or create coloring books that can be shared with multiple people.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time through your account dashboard. Go to the Subscription page, and click on 'Cancel Subscription.' Your subscription will remain active until the end of your current billing period.",
  },
  {
    question: "I need help with something else",
    answer:
      "If you have a question that isn't answered here, please contact our support team at support@drawgle.in. We're happy to help!",
  },
]

export default function FAQPage() {
  return (
    <div className="container max-w-4xl py-12">
      <WebsiteSchema
        title="Frequently Asked Questions About Drawgle Coloring Pages"
        description="Find answers to common questions about creating custom coloring pages, subscription plans, and using Drawgle's AI coloring page generator."
        path="/faq"
        type="FAQPage"
      />
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-3">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
