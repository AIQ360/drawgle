"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ImageCard } from "@/components/ui/image-card"
import { toast } from "sonner"
import Head from "next/head"
import { SITE_URL } from "@/lib/constants"

interface PublicImage {
  id: string
  image_url: string
  aspect_ratio: string
  created_at: string
  is_public: boolean
  source?: "regular" | "gemini"
}

export default function PublicGalleryPage() {
  const [images, setImages] = useState<PublicImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const ITEMS_PER_PAGE = 20

  useEffect(() => {
    const fetchPublicImages = async () => {
      if (!hasMore && !initialLoad) return

      setIsLoading(true)
      try {
        const response = await fetch(`/api/images/public?page=${page}&limit=${ITEMS_PER_PAGE}`)

        if (!response.ok) {
          throw new Error("Failed to fetch public images")
        }

        const data = await response.json()

        if (initialLoad) {
          setImages(data.images)
          setInitialLoad(false)
        } else {
          setImages((prev) => [...prev, ...data.images])
        }

        setHasMore(page < data.totalPages)
      } catch (err: any) {
        console.error("Error fetching public images:", err)
        setError(err.message || "Something went wrong")
        toast.error("Error loading images", {
          description: "Failed to load gallery images. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPublicImages()
  }, [page, initialLoad, hasMore])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || isLoading || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { threshold: 1.0 },
    )

    observer.observe(loadMoreRef.current)

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [isLoading, hasMore])

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  // Add schema and metadata
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Community Coloring Gallery - Drawgle",
    description: "Browse coloring pages created by our community. Find inspiration or just enjoy the creativity!",
    url: `${SITE_URL}/gallery`,
    isPartOf: {
      "@type": "WebSite",
      name: "Drawgle",
      url: SITE_URL,
    },
  }

  return (
    <>
      <Head>
        <title>Community Coloring Gallery - Browse User-Created Coloring Pages | Drawgle</title>
        <meta
          name="description"
          content="Browse a collection of community-created coloring pages. Find inspiration, download free samples, and see what's possible with Drawgle's AI coloring page generator."
        />
        <meta property="og:title" content="Community Coloring Gallery - Browse User-Created Coloring Pages | Drawgle" />
        <meta
          property="og:description"
          content="Browse a collection of community-created coloring pages. Find inspiration, download free samples, and see what's possible with Drawgle's AI coloring page generator."
        />
        <meta property="og:url" content={`${SITE_URL}/gallery`} />
        <link rel="canonical" href={`${SITE_URL}/gallery`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Community Coloring Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse coloring pages created by our community. Find inspiration or just enjoy the creativity!
          </p>
        </div>

        {initialLoad && isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error && images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button
              onClick={() => {
                setInitialLoad(true)
                setPage(1)
                setError(null)
              }}
            >
              Try Again
            </Button>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No public images available yet.</p>
            <Link href="/sign-up" passHref>
              <Button>Create Your Own</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={`${image.source || "regular"}-${image.id}`} className="w-full">
                  <ImageCard
                    id={image.id}
                    imageUrl={image.image_url}
                    aspectRatio={image.aspect_ratio}
                    createdAt={image.created_at}
                  />
                </div>
              ))}
            </div>

            <div ref={loadMoreRef} className="flex justify-center mt-8">
              {isLoading && !initialLoad ? (
                <div className="flex items-center justify-center py-4">
                  <Icons.spinner className="h-6 w-6 animate-spin text-primary mr-2" />
                  <span>Loading more...</span>
                </div>
              ) : hasMore ? (
                <Button onClick={handleLoadMore} variant="outline" disabled={isLoading}>
                  Load More
                </Button>
              ) : images.length > 0 ? (
                <p className="text-muted-foreground py-4">You've reached the end of the gallery</p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  )
}
