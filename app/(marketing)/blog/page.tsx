import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { WebsiteSchema } from "@/components/seo/schema"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Coloring Page Blog - Tips & Ideas for Parents and Teachers",
  description:
    "Discover creative ways to use coloring pages, educational activities, and child development insights in our blog for parents and teachers.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Coloring Page Blog - Tips & Ideas for Parents and Teachers",
    description:
      "Discover creative ways to use coloring pages, educational activities, and child development insights in our blog for parents and teachers.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
}

const blogPosts = [
  {
    id: 1,
    title: "10 Creative Ways to Use Coloring Pages in the Classroom",
    excerpt:
      "Discover innovative teaching methods using custom coloring pages to engage students and enhance learning across subjects.",
    image: "/placeholder.svg?key=k9kcs",
    date: "May 2, 2025",
    category: "Education",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Create Personalized Birthday Party Coloring Books",
    excerpt:
      "Learn how to design and create custom coloring books that make perfect party favors for children's birthday celebrations.",
    image: "/placeholder.svg?key=qpjuq",
    date: "April 28, 2025",
    category: "DIY Projects",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "The Benefits of Coloring for Child Development",
    excerpt:
      "Explore how coloring activities help develop fine motor skills, creativity, focus, and other important developmental areas.",
    image: "/placeholder.svg?key=mwjqs",
    date: "April 15, 2025",
    category: "Child Development",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "From Photos to Coloring Pages: Preserving Family Memories",
    excerpt:
      "Transform your favorite family photos into meaningful coloring activities that children will cherish for years to come.",
    image: "/placeholder.svg?key=37o99",
    date: "April 8, 2025",
    category: "Family Activities",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "Creating Educational Coloring Pages That Kids Actually Want to Color",
    excerpt:
      "Tips and tricks for designing educational coloring pages that are both informative and engaging for children of all ages.",
    image: "/placeholder.svg?key=g7tdu",
    date: "March 30, 2025",
    category: "Education",
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "Coloring for Mindfulness: How It Helps Children Manage Stress",
    excerpt:
      "Discover how coloring activities can help children develop mindfulness skills and manage anxiety in today's busy world.",
    image: "/placeholder.svg?key=wkqyx",
    date: "March 22, 2025",
    category: "Wellness",
    readTime: "5 min read",
  },
]

export default function BlogPage() {
  return (
    <div className="container py-12">
      <WebsiteSchema
        title="Coloring Page Blog - Tips & Ideas for Parents and Teachers"
        description="Discover creative ways to use coloring pages, educational activities, and child development insights in our blog for parents and teachers."
        path="/blog"
        type="WebPage"
      />

      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Drawgle Blog</h1>
        <p className="text-lg text-gray-600">Tips, tutorials, and inspiration for creating and using coloring pages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-primary font-medium">{post.category}</span>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{post.readTime}</span>
                <Button variant="link" className="p-0 h-auto font-medium">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button>Load More Articles</Button>
      </div>
    </div>
  )
}
