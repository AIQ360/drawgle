import type { Metadata } from "next"
import Link from "next/link"
import { FileText, HelpCircle, Mail } from "lucide-react"
import { WebsiteSchema } from "@/components/seo/schema"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Customer Support - Get Help with Drawgle Coloring Pages",
  description:
    "Contact our support team for help with your Drawgle account, subscription, or coloring page generation. We're here to assist you with any questions or issues.",
  alternates: {
    canonical: `${SITE_URL}/support`,
  },
  openGraph: {
    title: "Customer Support - Get Help with Drawgle Coloring Pages",
    description:
      "Contact our support team for help with your Drawgle account, subscription, or coloring page generation. We're here to assist you with any questions or issues.",
    url: `${SITE_URL}/support`,
  },
}

export default function SupportPage() {
  return (
    <div className="container py-12">
      <WebsiteSchema
        title="Customer Support - Get Help with Drawgle Coloring Pages"
        description="Contact our support team for help with your Drawgle account, subscription, or coloring page generation. We're here to assist you with any questions or issues."
        path="/support"
        type="WebPage"
      />

      <h1 className="text-3xl font-bold mb-8 text-center">Support Center</h1>

      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-center text-lg text-gray-600 mb-8">
          Need help with Drawgle? We're here to assist you. Check out our resources below or contact our support team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/faq" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find answers to common questions about using Drawgle, subscriptions, and features.
              </p>
            </div>
          </Link>

          <Link href="/terms" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">Terms & Policies</h2>
              <p className="text-gray-600">Review our Terms of Service, Privacy Policy, and Refund Policy.</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="mb-4">For any questions, feedback, or support needs, please email us at:</p>
            <a
              href="mailto:support@drawgle.in"
              className="text-primary hover:underline font-medium text-lg flex items-center"
            >
              <Mail className="mr-2 h-5 w-5" />
              support@drawgle.in
            </a>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">India Office Address</h3>
            <p className="mb-2">Drawgle</p>
            <p className="text-gray-600">
              Kursanda, Sadabad
              <br />
              Hathras, Uttar Pradesh
              <br />
              281306, India
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Response Time</h3>
            <p className="text-gray-600">We aim to respond to all inquiries within 24-48 hours during business days.</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Support Hours</h2>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-lg mb-2">Customer Support</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM IST</p>
              <p className="text-gray-600">Weekend: Limited support via email</p>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Average Response Time</p>
                <p className="text-gray-600">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
