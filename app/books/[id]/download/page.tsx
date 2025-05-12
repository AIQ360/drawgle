"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getBookById } from "@/lib/actions/book-actions"
import { generatePDF } from "@/lib/pdf-generator"
import { Icons } from "@/components/icons"
import { toast } from "sonner"

export default function BookDownloadPage() {
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const downloadBook = async () => {
      if (!params.id) {
        router.push("/dashboard/books")
        return
      }

      try {
        const result = await getBookById(params.id as string)

        if (!result.success || !result.book) {
          throw new Error(result.error || "Book not found")
        }

        const book = result.book

        // Extract image URLs from the book images
        const imageUrls = book.images.map((img: any) =>
          img.source === "gemini" ? img.coloring_page_url : img.image_url,
        )

        // Generate the PDF
        const pdfBlob = await generatePDF(imageUrls, {
          title: book.title,
          subtitle: book.subtitle,
          author: book.author,
          coverImage: book.cover_image,
          coverBackground: book.cover_background,
          addBlankPages: book.options?.addBlankPages || false,
          addPageNumbers: book.options?.addPageNumbers || true,
          paperSize: book.options?.paperSize || "letter",
          pageLayout: book.options?.pageLayout || "single",
          borderWidth: book.options?.borderWidth || 0,
        })

        // Create a download link
        const url = URL.createObjectURL(pdfBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${book.title.replace(/\s+/g, "-").toLowerCase()}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Redirect back to the book page
        setTimeout(() => {
          router.push(`/books/${params.id}`)
        }, 1000) // Short delay to ensure download starts
      } catch (error) {
        console.error("Error downloading book:", error)
        toast.error("Failed to generate PDF. Please try again.")

        // Redirect back to the book page even on error
        setTimeout(() => {
          router.push(`/books/${params.id}`)
        }, 1000)
      }
    }

    downloadBook()
  }, [params.id, router])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Icons.spinner className="h-12 w-12 animate-spin text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2">Preparing Your Download</h1>
        <p className="text-muted-foreground">Your coloring book will download automatically in a moment...</p>
        <p className="text-muted-foreground mt-4">You'll be redirected back after the download starts.</p>
      </div>
    </div>
  )
}
