import type { Metadata } from "next"
import { WebsiteSchema } from "@/components/seo/schema"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Refund Policy - Money-Back Guarantee for Drawgle Subscriptions",
  description:
    "Learn about our refund policy for Drawgle subscriptions, including eligibility criteria and how to request a refund for our AI coloring page generator service.",
  alternates: {
    canonical: `${SITE_URL}/refund`,
  },
  openGraph: {
    title: "Refund Policy - Money-Back Guarantee for Drawgle Subscriptions",
    description:
      "Learn about our refund policy for Drawgle subscriptions, including eligibility criteria and how to request a refund for our AI coloring page generator service.",
    url: `${SITE_URL}/refund`,
  },
}

export default function RefundPage() {
  return (
    <div className="container max-w-4xl py-12">
      <WebsiteSchema
        title="Refund Policy - Money-Back Guarantee for Drawgle Subscriptions"
        description="Learn about our refund policy for Drawgle subscriptions, including eligibility criteria and how to request a refund for our AI coloring page generator service."
        path="/refund"
        type="WebPage"
      />

      <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg mb-6">Last Updated: May 4, 2025</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Subscription Refunds</h2>
        <p>
          At Drawgle, we want you to be completely satisfied with our service. If you are not satisfied with your
          subscription purchase, you may request a refund within 7 days of your initial purchase under the following
          conditions:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>You have not used more than 10% of your monthly credit allocation</li>
          <li>You have not created more than 5 coloring pages</li>
          <li>You have not downloaded any coloring books</li>
        </ul>
        <p>
          To request a refund, please contact our support team at refunds@drawgle.in with your account email address and
          the reason for your refund request.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Credit Pack Refunds</h2>
        <p>
          One-time credit pack purchases are non-refundable once any credits have been used. If you have purchased a
          credit pack and have not used any credits, you may request a refund within 24 hours of purchase.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Subscription Cancellations</h2>
        <p>You may cancel your subscription at any time through your account dashboard. Upon cancellation:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Your subscription will remain active until the end of your current billing period</li>
          <li>You will not be charged for the next billing cycle</li>
          <li>No partial refunds are provided for the remainder of the current billing period</li>
          <li>You will retain access to all previously generated coloring pages and books</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Exceptions</h2>
        <p>
          We may consider refund requests outside of these guidelines on a case-by-case basis for exceptional
          circumstances, such as:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Technical issues that significantly impacted your ability to use our service</li>
          <li>Accidental purchases or duplicate charges</li>
          <li>Other extenuating circumstances beyond your control</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Refund Processing</h2>
        <p>
          Approved refunds will be processed using the original payment method used for the purchase. Refunds typically
          take 5-10 business days to appear on your statement, depending on your payment provider.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
        <p>
          If you have any questions about our refund policy or would like to request a refund, please contact us at
          refunds@drawgle.in.
        </p>
      </div>
    </div>
  )
}
