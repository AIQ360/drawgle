import type { Metadata } from "next"
import { WebsiteSchema } from "@/components/seo/schema"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Privacy Policy - How Drawgle Protects Your Data",
  description:
    "Learn how Drawgle collects, uses, and protects your personal information when you use our AI coloring page generator service.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy - How Drawgle Protects Your Data",
    description:
      "Learn how Drawgle collects, uses, and protects your personal information when you use our AI coloring page generator service.",
    url: `${SITE_URL}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <WebsiteSchema
        title="Privacy Policy - How Drawgle Protects Your Data"
        description="Learn how Drawgle collects, uses, and protects your personal information when you use our AI coloring page generator service."
        path="/privacy"
        type="WebPage"
      />

      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg mb-6">Last Updated: May 4, 2025</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          At Drawgle ("we," "our," or "us"), we value your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
          you use our website, services, and applications (collectively, the "Service").
        </p>
        <p>
          By accessing or using the Service, you consent to the collection, use, and disclosure of your information as
          described in this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
        <p>
          <strong>Personal Information:</strong> We collect information that you provide directly to us, such as your
          name, email address, and payment information when you create an account, subscribe to our Service, or contact
          our support team.
        </p>
        <p>
          <strong>Usage Information:</strong> We automatically collect certain information about your device and how you
          interact with our Service, including your IP address, browser type, operating system, referring URLs, and
          actions taken on our website.
        </p>
        <p>
          <strong>User Content:</strong> We collect and store the content you upload (such as photos) and generate (such
          as coloring pages) using our Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Provide, maintain, and improve our Service</li>
          <li>Process transactions and manage your account</li>
          <li>Send you technical notices, updates, security alerts, and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our Service</li>
          <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
          <li>Personalize and improve your experience with our Service</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Sharing Your Information</h2>
        <p>We may share your information in the following circumstances:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>With service providers who perform services on our behalf</li>
          <li>To comply with legal obligations</li>
          <li>To protect and defend our rights and property</li>
          <li>With your consent or at your direction</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against
          unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of
          transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
          security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy
          Policy, unless a longer retention period is required or permitted by law.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
        <p>
          Our Service is not directed to children under the age of 13. We do not knowingly collect personal information
          from children under 13. If you are a parent or guardian and believe that your child has provided us with
          personal information, please contact us so that we can delete the information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Your Rights</h2>
        <p>
          Depending on your location, you may have certain rights regarding your personal information, such as the right
          to access, correct, delete, or restrict processing of your information. To exercise these rights, please
          contact us using the information provided below.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
          Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@drawgle.in.</p>
      </div>
    </div>
  )
}
