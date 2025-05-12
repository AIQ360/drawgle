import type { Metadata } from "next"
import { WebsiteSchema } from "@/components/seo/schema"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Terms of Service - Legal Agreement for Using Drawgle",
  description:
    "Read our Terms of Service to understand the rules and guidelines for using Drawgle's AI coloring page generator, including subscription terms and content policies.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Service - Legal Agreement for Using Drawgle",
    description:
      "Read our Terms of Service to understand the rules and guidelines for using Drawgle's AI coloring page generator, including subscription terms and content policies.",
    url: `${SITE_URL}/terms`,
  },
}

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <WebsiteSchema
        title="Terms of Service - Legal Agreement for Using Drawgle"
        description="Read our Terms of Service to understand the rules and guidelines for using Drawgle's AI coloring page generator, including subscription terms and content policies."
        path="/terms"
        type="WebPage"
      />

      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg mb-6">Last Updated: May 4, 2025</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          Welcome to Drawgle ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of
          the Drawgle website, services, and applications (collectively, the "Service"). By accessing or using the
          Service, you agree to be bound by these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Using Our Service</h2>
        <p>
          <strong>Account Creation:</strong> To use certain features of the Service, you must create an account. You are
          responsible for maintaining the confidentiality of your account credentials and for all activities that occur
          under your account.
        </p>
        <p>
          <strong>Age Restrictions:</strong> You must be at least 18 years old to create an account. If you are under
          18, you may only use the Service with the involvement and consent of a parent or guardian.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Subscription and Payments</h2>
        <p>
          <strong>Subscription Plans:</strong> We offer various subscription plans with different features and pricing.
          By selecting a subscription plan, you agree to pay the applicable fees.
        </p>
        <p>
          <strong>Billing:</strong> We will bill you in advance on a recurring basis, depending on the type of
          subscription plan you select. Billing cycles are set on a monthly or annual basis.
        </p>
        <p>
          <strong>Free Trial:</strong> We may offer free trials to new users. At the end of the free trial period, you
          will be automatically charged for the subscription unless you cancel before the trial ends.
        </p>
        <p>
          <strong>Cancellation:</strong> You may cancel your subscription at any time through your account settings.
          Upon cancellation, your subscription will remain active until the end of your current billing period.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Content</h2>
        <p>
          <strong>User Content:</strong> You retain ownership of any content you create or upload to the Service. By
          uploading content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify,
          and display the content solely for the purpose of operating and improving the Service.
        </p>
        <p>
          <strong>Public Gallery:</strong> If you choose to make your coloring pages public, they may appear in our
          public gallery. You can control the visibility of your content through your account settings.
        </p>
        <p>
          <strong>Prohibited Content:</strong> You may not upload or generate content that is illegal, harmful,
          threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
        <p>
          <strong>Our Content:</strong> The Service and its original content, features, and functionality are owned by
          Drawgle and are protected by international copyright, trademark, patent, trade secret, and other intellectual
          property laws.
        </p>
        <p>
          <strong>Generated Content:</strong> You own the coloring pages you generate using our Service. However, we
          cannot claim copyright protection for AI-generated content in some jurisdictions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2>
        <p>
          We may terminate or suspend your account and access to the Service immediately, without prior notice or
          liability, for any reason, including if you breach these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
        <p>
          In no event shall Drawgle be liable for any indirect, incidental, special, consequential, or punitive damages,
          including loss of profits, data, or goodwill, arising out of or in connection with your access to or use of
          the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
          posting the updated Terms on this page and updating the "Last Updated" date. Your continued use of the Service
          after such changes constitutes your acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at support@drawgle.in.</p>
      </div>
    </div>
  )
}
