"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Eye, Download, Trash2, ImageIcon, Check } from "lucide-react"
import { formatDate, downloadImage } from "@/lib/utils"
import { VisibilityToggle } from "@/components/dashboard/visibility-toggle"
import { ImagePreviewModal } from "@/components/ui/image-preview-modal"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ImageCardProps {
  id: string
  prompt: string
  imageUrl: string
  aspectRatio: string
  createdAt: string
  isPublic?: boolean
  showVisibilityToggle?: boolean
  showDeleteButton?: boolean
  isDeleting?: boolean
  originalImageUrl?: string | null
  tableType?: "images" | "gemini_images"
  selectable?: boolean
  isSelected?: boolean
  onVisibilityToggle?: (isPublic: boolean) => void
  onDelete?: (id: string) => Promise<void>
  onSelectToggle?: () => void
}

export function ImageCard({
  id,
  prompt,
  imageUrl,
  aspectRatio,
  createdAt,
  isPublic = false,
  showVisibilityToggle = false,
  showDeleteButton = false,
  isDeleting = false,
  originalImageUrl,
  tableType = "images",
  selectable = false,
  isSelected = false,
  onVisibilityToggle,
  onDelete,
  onSelectToggle,
}: ImageCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isOriginalPreviewOpen, setIsOriginalPreviewOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const filename = `coloring-page-${prompt.slice(0, 20).replace(/[^a-z0-9]/gi, "-")}.png`

    try {
      await downloadImage(imageUrl, filename)
      toast.success("Image downloaded successfully")
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Failed to download image")
    }
  }

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsPreviewOpen(true)
  }

  const handleOriginalPreview = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOriginalPreviewOpen(true)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (onDelete) {
      await onDelete(id)
    }
  }

  const handleCardClick = () => {
    if (selectable && onSelectToggle) {
      onSelectToggle()
    }
  }

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden w-full h-full transition-all",
          isDeleting ? "opacity-50" : "",
          selectable ? "cursor-pointer hover:shadow-md" : "",
          selectable && isSelected ? "ring-2 ring-primary" : "",
        )}
        onClick={handleCardClick}
      >
        <div
          className={`relative ${
            aspectRatio === "portrait" ? "aspect-[3/4]" : aspectRatio === "landscape" ? "aspect-[4/3]" : "aspect-square"
          }`}
        >
          {(!imageLoaded || isDeleting) && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Icons.spinner className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={prompt}
            className={`object-cover w-full h-full transition-opacity duration-300 ${
              imageLoaded && !isDeleting ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Selection indicator */}
          {selectable && isSelected && (
            <div className="absolute top-2 left-2 bg-primary text-white rounded-full p-1">
              <Check className="h-5 w-5" />
            </div>
          )}

          {/* Action buttons - only show if not in selection mode */}
          {!selectable && (
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 rounded-full bg-white/90 text-black hover:bg-white shadow-md image-action-button"
                onClick={handlePreview}
                aria-label="Preview image"
                disabled={isDeleting}
              >
                <Eye className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 rounded-full bg-white/90 text-black hover:bg-white shadow-md image-action-button"
                onClick={handleDownload}
                aria-label="Download image"
                disabled={isDeleting}
              >
                <Download className="h-5 w-5" />
              </Button>
              {originalImageUrl && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-9 w-9 rounded-full bg-white/90 text-black hover:bg-white shadow-md image-action-button"
                  onClick={handleOriginalPreview}
                  aria-label="View original image"
                  disabled={isDeleting}
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
              )}
            </div>
          )}

          {/* Delete button in top left - only show if not in selection mode */}
          {showDeleteButton && !selectable && (
            <div className="absolute top-2 left-2">
              <Button
                size="icon"
                variant="destructive"
                className="h-9 w-9 rounded-full bg-white/90 text-red-500 hover:bg-white hover:text-red-600 shadow-md image-action-button"
                onClick={handleDeleteClick}
                aria-label="Delete image"
                disabled={isDeleting}
              >
                {isDeleting ? <Icons.spinner className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </div>
        <CardFooter className="flex flex-col items-start p-3">
          <p className="text-sm truncate w-full font-medium">{prompt}</p>
          <div className="flex justify-between w-full mt-2 text-xs text-muted-foreground">
            <span>{formatDate(createdAt)}</span>
            <span className="capitalize">{aspectRatio}</span>
          </div>
          {showVisibilityToggle && !selectable && (
            <div className="w-full mt-3 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Share with others?</span>
              <VisibilityToggle
                imageId={id}
                isPublic={isPublic}
                onToggle={onVisibilityToggle}
                disabled={isDeleting}
                tableType={tableType}
              />
            </div>
          )}
        </CardFooter>
      </Card>

      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={imageUrl}
        prompt={prompt}
      />

      {originalImageUrl && (
        <ImagePreviewModal
          isOpen={isOriginalPreviewOpen}
          onClose={() => setIsOriginalPreviewOpen(false)}
          imageUrl={originalImageUrl}
          prompt="Original Image"
        />
      )}

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Image"
        description="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  )
}
