"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { getBookById } from "@/lib/actions/book-actions"
import { generatePDF } from "@/lib/pdf-generator"
import { formatDate } from "@/lib/utils"

export default function BookPage() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchBook(params.id as string)
    }
  }, [params.id])

  const fetchBook = async (bookId: string) => {
    setIsLoading(true)
    try {
      const result = await getBookById(bookId)

      if (result.success) {
        setBook(result.book)
      } else {
        throw new Error(result.error || "Failed to fetch book")
      }
    } catch (error: any) {
      console.error("Error fetching book:", error)
      setError(error.message || "Failed to load coloring book")
      toast.error("Error loading book", {
        description: "Failed to load the coloring book. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!book) return

    setIsGenerating(true)
    try {
      // Extract image URLs from the book images
      const imageUrls = book.images.map((img: any) => (img.source === "gemini" ? img.coloring_page_url : img.image_url))

      // Get the cover image URL directly from the book object
      const coverImageUrl = book.cover_image || null
      console.log("Cover image URL for PDF:", coverImageUrl)

      // Get the book options
      const options = book.options || {}

      // Generate the PDF using the saved options
      const pdfBlob = await generatePDF(imageUrls, {
        title: book.title,
        subtitle: book.subtitle,
        coverImage: coverImageUrl,
        addBlankPages: options.addBlankPages || false,
        addPageNumbers: options.addPageNumbers || true,
        borderWidth: options.borderWidth || 0,
      })

      // Create a download link
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${book.title.replace(/\s+/g, "-").toLowerCase()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success("Coloring book downloaded successfully!")
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to download coloring book")
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePrintNow = async () => {
    if (!book) return

    setIsGenerating(true)
    try {
      // Extract image URLs from the book images
      const imageUrls = book.images.map((img: any) => (img.source === "gemini" ? img.coloring_page_url : img.image_url))

      // Get the cover image URL directly from the book object
      const coverImageUrl = book.cover_image || null
      console.log("Cover image URL for print:", coverImageUrl)

      // Get the book options
      const options = book.options || {}

      // Generate the PDF using the saved options
      const pdfBlob = await generatePDF(imageUrls, {
        title: book.title,
        subtitle: book.subtitle,
        coverImage: coverImageUrl,
        addBlankPages: options.addBlankPages || false,
        addPageNumbers: options.addPageNumbers || true,
        borderWidth: options.borderWidth || 0,
      })

      // Create a URL for the PDF
      const url = URL.createObjectURL(pdfBlob)

      // Open the PDF in a new window and trigger print
      const printWindow = window.open(url)
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print()
        }
      } else {
        toast.error("Please allow pop-ups to print")
      }

      toast.success("Print dialog opened!")
    } catch (error) {
      console.error("Error printing:", error)
      toast.error("Failed to print coloring book")
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[300px]">
          <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error || "Book not found"}</p>
          <Button onClick={() => router.push("/dashboard/books")}>Go Back to Books</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <Icons.arrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-muted-foreground">
              Created on {formatDate(book.created_at)} • {book.images.length}{" "}
              {book.images.length === 1 ? "page" : "pages"}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrintNow} disabled={isGenerating}>
              <Icons.printer className="mr-2 h-4 w-4" />
              Print Now
            </Button>
            <Button onClick={handleDownload} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Icons.download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {book.images.map((image: any, index: number) => (
          <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden border">
            <img
              src={image.source === "gemini" ? image.coloring_page_url : image.image_url}
              alt={image.prompt || "Coloring page"}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
              Page {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
