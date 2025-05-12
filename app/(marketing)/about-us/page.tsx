import type { Metadata } from "next"
import Image from "next/image"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: `About Us | The Story Behind ${SITE_NAME}`,
  description:
    "Learn about the indie maker journey behind Drawgle, a passion project turned into an AI-powered coloring page generator for families and educators.",
  openGraph: {
    title: `About Us | The Story Behind ${SITE_NAME}`,
    description:
      "Learn about the indie maker journey behind Drawgle, a passion project turned into an AI-powered coloring page generator for families and educators.",
    url: `${SITE_URL}/about-us`,
    type: "website",
  },
}

export default function AboutUsPage() {
  return (
    <div className="container py-12 md:py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About Drawgle</h1>

      <div className="prose prose-lg max-w-none">
        <h2>The Indie Maker Journey</h2>
        <p>
          Hi there! I'm the creator behind Drawgle, and I'm passionate about bringing creativity and technology together
          in meaningful ways.
        </p>

        <div className="my-8 relative aspect-video rounded-lg overflow-hidden">
          <Image
            src="/abstract-geometric-shapes.png"
            alt="Colorful abstract shapes representing creativity and technology"
            fill
            className="object-cover"
          />
        </div>

        <h3>How It All Started</h3>
        <p>
          Drawgle began as a personal project born from a simple need. As someone who grew up loving coloring books and
          later became fascinated with AI and technology, I wondered: what if parents, teachers, and caregivers could
          create custom coloring pages tailored exactly to what children are interested in at the moment?
        </p>

        <p>
          The idea struck me while watching my niece struggle to find coloring pages of her favorite cartoon character.
          The available options were either limited, expensive, or required advanced design skills to create from
          scratch.
        </p>

        <h3>From Idea to Reality</h3>
        <p>
          Building Drawgle wasn't straightforward. As an indie developer, I faced the typical challenges of limited
          resources and time. I spent countless late nights learning about AI image generation, fine-tuning models to
          create perfect line art, and building a user-friendly interface that anyone could use without technical
          knowledge.
        </p>

        <p>
          What started as a weekend project quickly evolved into something bigger as I shared early versions with
          friends and family. Their excitement and feedback fueled further development, and I realized this tool could
          help many more people than I initially imagined.
        </p>

        <h3>Our Mission</h3>
        <p>Drawgle's mission is simple: to make custom coloring page creation accessible to everyone. We believe in:</p>

        <ul>
          <li>
            <strong>Creativity without barriers</strong> - Anyone should be able to create custom coloring pages without
            design skills
          </li>
          <li>
            <strong>Educational value</strong> - Coloring pages that can be tailored to what children are learning
          </li>
          <li>
            <strong>Sustainability</strong> - Reducing waste by printing only what you need, when you need it
          </li>
          <li>
            <strong>Affordability</strong> - Making creative tools accessible at a fraction of commercial alternatives
          </li>
        </ul>

        <h3>The Technology Behind Drawgle</h3>
        <p>
          Drawgle uses advanced AI models specifically trained to generate high-quality line art suitable for coloring.
          Unlike generic AI image generators, our system understands the specific requirements of coloring pages - clear
          lines, appropriate complexity for different age groups, and printable designs.
        </p>

        <p>
          We've built this using a combination of open-source technologies and custom-trained models, all wrapped in a
          user interface designed to be intuitive for everyone from tech-savvy teachers to grandparents wanting to
          create something special for their grandchildren.
        </p>

        <h3>Looking Forward</h3>
        <p>
          As a bootstrapped indie project, Drawgle continues to evolve based on user feedback and needs. Future plans
          include expanding our coloring book creation tools, adding more customization options, and building a
          community where users can share their creations.
        </p>

        <p>
          I'm committed to keeping Drawgle accessible while continuing to improve its capabilities. Every subscription
          helps fund further development and server costs, allowing this project to grow sustainably.
        </p>

        <h3>Get in Touch</h3>
        <p>
          I love hearing from users! Whether you have feedback, questions, or just want to share your experience with
          Drawgle, please reach out through our <a href="/support">support page</a> or connect with me on Twitter.
        </p>

        <p>Thank you for being part of this journey!</p>
      </div>
    </div>
  )
}
