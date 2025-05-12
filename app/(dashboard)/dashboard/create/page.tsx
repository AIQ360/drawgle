"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { AspectRatio, GenerateImageParams } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { AspectRatioToggle } from "@/components/dashboard/aspect-ratio-toggle"
import { NumberOfImagesToggle } from "@/components/dashboard/number-of-images-toggle"
import { PromptInput } from "@/components/dashboard/prompt-input"
import { GeneratingIndicator } from "@/components/dashboard/generating-indicator"
import { ImageUpload } from "@/components/dashboard/image-upload"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { imageToBase64Client } from "@/utils/gemini/geminiClient"
import { ImagePreviewModal } from "@/components/ui/image-preview-modal"
import { downloadImage } from "@/lib/utils"

type GenerationMethod = "text-to-image" | "image-to-coloring"

export default function CreatePage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("square")
  const [numImages, setNumImages] = useState(1)
  const [prompt, setPrompt] = useState("")
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [generationStatus, setGenerationStatus] = useState("pending")
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationMethod, setGenerationMethod] = useState<GenerationMethod>("text-to-image")
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewImageUrl, setPreviewImageUrl] = useState("")

  // Add ref for the output area to scroll to
  const outputAreaRef = useRef<HTMLDivElement>(null)

  // For polling
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [requestData, setRequestData] = useState<{
    requestId: string
    model?: string
    prompt?: string
    aspectRatio?: string
    numImages?: number
  } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Use getUser instead of getSession for better security
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !authUser) {
          throw authError || new Error("User not found")
        }

        const { data, error } = await supabase.from("users_metadata").select("*").eq("id", authUser.id).single()

        if (error) {
          throw error
        }

        if (data) {
          setUser({
            id: authUser.id,
            email: authUser.email,
            ...data,
          })
        }
      } catch (error: any) {
        console.error("Error fetching user:", error)
        toast.error("Error loading user data", {
          description: error.message || "Please try refreshing the page",
        })
        router.push("/sign-in")
      }
    }

    fetchUser()

    // Cleanup polling interval on unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
      }
    }
  }, [supabase, router])

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt)
  }

  // Function to scroll to output area
  const scrollToOutputArea = () => {
    // Only scroll on mobile devices
    if (window.innerWidth < 1024 && outputAreaRef.current) {
      // Use setTimeout to ensure the DOM has updated
      setTimeout(() => {
        outputAreaRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  const handleGenerate = async (inputPrompt: string) => {
    if (!user) {
      toast.error("User not found", {
        description: "Please sign in again",
      })
      return
    }

    // For text-to-image, check if user has enough credits for the number of images
    // For image-to-coloring, check if user has at least 1 credit
    const requiredCredits = generationMethod === "text-to-image" ? numImages : 1

    if (user.credits < requiredCredits) {
      setShowUpgradeDialog(true)
      return
    }

    setIsLoading(true)
    setPrompt(inputPrompt)
    setGeneratedImages([])
    setGenerationStatus("pending")
    setGenerationProgress(0)

    // Show a loading toast
    const loadingToast = toast.loading("Preparing your coloring pages...", {
      description: "This may take a moment",
    })

    try {
      if (generationMethod === "text-to-image") {
        // Text-to-image generation
        const params: GenerateImageParams = {
          prompt: inputPrompt,
          aspectRatio,
          numImages,
          model: "sana", // Default model, can be changed via env
        }

        // Queue the image generation
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || "Failed to queue image generation")
        }

        const data = await response.json()
        setRequestData(data)

        // Dismiss the loading toast
        toast.dismiss(loadingToast)

        // Show a new toast for the generation process
        toast.success("Generation started", {
          description: "Your coloring pages are being created",
        })

        // Scroll to output area
        scrollToOutputArea()

        // Start polling for status
        startPolling(data.requestId, data.model, data.prompt, data.aspectRatio, data.numImages)
      } else {
        // Image-to-coloring generation
        if (!uploadedImage) {
          toast.dismiss(loadingToast)
          toast.error("No image selected", {
            description: "Please upload an image to convert",
          })
          setIsLoading(false)
          return
        }

        try {
          // Set progress to indicate processing
          setGenerationProgress(30)

          // Scroll to output area
          scrollToOutputArea()

          // Convert the image to base64 on the client side
          const imageBase64 = await imageToBase64Client(uploadedImage)

          setGenerationProgress(50)

          // Now directly send the image data to the result endpoint
          const resultResponse = await fetch("/api/generate-gemini/result", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              requestId: `dummy-request-${Date.now()}`,
              imageBase64,
              mimeType: uploadedImage.type,
              // We're still sending aspectRatio but will modify the backend later to ignore it
              aspectRatio: "square", // Default to square regardless of UI selection
            }),
          })

          setGenerationProgress(80)

          if (!resultResponse.ok) {
            const error = await resultResponse.json()

            // Check if we should not deduct credit
            if (error.noCredit) {
              // Don't deduct credit for this error
              toast.error("Error generating coloring page", {
                description: error.message || "Failed to generate coloring page. No credits were used.",
              })
            } else {
              throw new Error(error.message || "Failed to generate coloring page")
            }

            setIsLoading(false)
            toast.dismiss(loadingToast)
            return
          }

          const resultData = await resultResponse.json()
          setGenerationProgress(100)

          // Handle both URL and direct base64 data
          if (resultData.coloringPageUrl) {
            // Set the generated image from URL
            setGeneratedImages([resultData.coloringPageUrl])
          } else if (resultData.coloringPageBase64) {
            // If we got base64 data directly, use that
            setGeneratedImages([resultData.coloringPageBase64])

            // Show a warning that the image wasn't saved to the gallery
            toast.warning("Image generated but not saved to gallery", {
              description:
                "The image was generated successfully but couldn't be saved to your gallery due to a storage error.",
            })
          }

          // Refresh user data to get updated credits
          const { data: updatedUserData } = await supabase.from("users_metadata").select("*").eq("id", user.id).single()

          if (updatedUserData) {
            setUser({
              ...user,
              credits: updatedUserData.credits,
            })
          }

          toast.dismiss(loadingToast)
          toast.success("Coloring page generated successfully", {
            description: `Used 1 credit. You have ${updatedUserData.credits} credit${updatedUserData.credits !== 1 ? "s" : ""} left.`,
          })
        } catch (error: any) {
          console.error("Generation error:", error)
          toast.dismiss(loadingToast)
          toast.error("Error generating coloring page", {
            description: error.message || "Something went wrong",
          })
        } finally {
          setIsLoading(false)
        }
      }
    } catch (error: any) {
      console.error("Generation error:", error)
      toast.dismiss(loadingToast)
      toast.error("Error generating images", {
        description: error.message || "Something went wrong",
      })
      setIsLoading(false)
    }
  }

  const startPolling = (requestId: string, model: string, prompt: string, aspectRatio: string, numImages: number) => {
    // Clear any existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
    }

    // Set up polling interval
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/generate/status?requestId=${requestId}&model=${model}`)

        if (!response.ok) {
          throw new Error("Failed to check status")
        }

        const statusData = await response.json()

        // Update status and progress
        if (statusData.status === "COMPLETED") {
          // Generation completed, fetch results
          clearInterval(pollingIntervalRef.current!)
          fetchResults(requestId, model, prompt, aspectRatio, numImages)
        } else if (statusData.status === "FAILED") {
          clearInterval(pollingIntervalRef.current!)
          throw new Error(statusData.error || "Generation failed")
        } else {
          // Update status
          setGenerationStatus(statusData.status.toLowerCase())

          // Calculate progress (this is approximate)
          if (statusData.status === "IN_PROGRESS") {
            setGenerationProgress(50) // In progress is roughly 50%
          } else if (statusData.status === "PENDING") {
            setGenerationProgress(10) // Pending is roughly 10%
          }
        }
      } catch (error: any) {
        clearInterval(pollingIntervalRef.current!)
        console.error("Status check error:", error)
        toast.error("Error checking generation status", {
          description: error.message || "Something went wrong",
        })
        setIsLoading(false)
      }
    }, 2000) // Poll every 2 seconds
  }

  const fetchResults = async (
    requestId: string,
    model: string,
    prompt: string,
    aspectRatio: string,
    numImages: number,
  ) => {
    try {
      setGenerationProgress(90) // Almost done

      const response = await fetch(
        `/api/generate/result?requestId=${requestId}&model=${model}&prompt=${encodeURIComponent(prompt)}&aspectRatio=${aspectRatio}&numImages=${numImages}`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch results")
      }

      const data = await response.json()
      setGeneratedImages(data.images)

      // Refresh user data to get updated credits
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        const { data: updatedUserData, error } = await supabase
          .from("users_metadata")
          .select("*")
          .eq("id", authUser.id)
          .single()

        if (error) {
          throw error
        }

        if (updatedUserData) {
          setUser({
            ...user,
            credits: updatedUserData.credits,
          })
        }
      }

      toast.success("Images generated successfully", {
        description: `Used ${numImages} credit${numImages > 1 ? "s" : ""}. You have ${user.credits - numImages} credit${user.credits - numImages !== 1 ? "s" : ""} left.`,
      })
    } catch (error: any) {
      console.error("Result fetch error:", error)
      toast.error("Error fetching generated images", {
        description: error.message || "Something went wrong",
      })
    } finally {
      setIsLoading(false)
      setGenerationProgress(100)
    }
  }

  const handleDownload = (imageUrl: string) => {
    try {
      // Use the downloadImage utility function
      downloadImage(imageUrl, `coloring-page-${Date.now()}.png`)
        .then(() => {
          toast.success("Download started", {
            description: "Your coloring page is being downloaded",
          })
        })
        .catch((error) => {
          console.error("Download error:", error)
          toast.error("Error downloading image", {
            description: "Something went wrong with the download",
          })
        })
    } catch (error: any) {
      console.error("Download error:", error)
      toast.error("Error downloading image", {
        description: error.message || "Something went wrong",
      })
    }
  }

  const handleImageSelect = (file: File) => {
    setUploadedImage(file)
  }

  const handleGenerationMethodChange = (method: GenerationMethod) => {
    setGenerationMethod(method)
    // Reset some state when switching methods
    setGeneratedImages([])
  }

  // Render the preview area (left column)
  const renderPreviewArea = () => {
    if (isLoading) {
      return <GeneratingIndicator status={generationStatus} progress={generationProgress} />
    }

    if (generatedImages.length > 0) {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Generated Coloring Pages</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {generatedImages.map((imageUrl, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`aspect-${aspectRatio} relative`}>
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Generated coloring page ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardFooter className="p-2 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPreviewImageUrl(imageUrl)
                      setIsPreviewOpen(true)
                    }}
                  >
                    <Icons.eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(imageUrl)}>
                    <Icons.download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )
    }

    // Default preview placeholder
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6 border-2 border-dashed rounded-lg border-muted">
        <div className="mb-4">
          <Icons.image className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium mb-2">No Images Generated Yet</h3>
        <p className="text-muted-foreground max-w-md">
          {generationMethod === "text-to-image"
            ? "Enter a prompt and click Generate to create coloring pages from your description."
            : "Upload an image and click Generate to convert it into a coloring page."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Coloring Page</h2>
        <p className="text-muted-foreground">Generate beautiful coloring pages with AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Control Panel - First on mobile, second on desktop */}
        <div className="lg:col-span-2 lg:order-2 order-1">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>Generation Settings</CardTitle>
              <CardDescription>Configure your coloring page options</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Generation Method Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Generation Method</label>
                <div className="flex space-x-2">
                  <Button
                    variant={generationMethod === "text-to-image" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => handleGenerationMethodChange("text-to-image")}
                    disabled={isLoading}
                  >
                    <Icons.post className="h-4 w-4 mr-2" />
                    Text to Image
                  </Button>
                  <Button
                    variant={generationMethod === "image-to-coloring" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => handleGenerationMethodChange("image-to-coloring")}
                    disabled={isLoading}
                  >
                    <Icons.media className="h-4 w-4 mr-2" />
                    Image to Coloring
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {generationMethod === "text-to-image"
                    ? "Generate coloring pages from text descriptions"
                    : "Convert your photos into coloring pages"}
                </p>
              </div>

              <Separator />

              {/* Settings Section */}
              <div className="space-y-4">
                {/* Only show aspect ratio for text-to-image */}
                {generationMethod === "text-to-image" && (
                  <AspectRatioToggle value={aspectRatio} onChange={setAspectRatio} />
                )}

                {/* Only show number of images for text-to-image */}
                {generationMethod === "text-to-image" && (
                  <NumberOfImagesToggle value={numImages} onChange={setNumImages} max={user?.credits || 0} />
                )}

                {/* Input Section - Either text prompt or image upload */}
                <div className="pt-2">
                  {generationMethod === "text-to-image" ? (
                    <PromptInput
                      onSubmit={handleGenerate}
                      isLoading={isLoading}
                      defaultValue={prompt}
                      onChange={handlePromptChange} // Add onChange handler
                    />
                  ) : (
                    <ImageUpload
                      onImageSelect={handleImageSelect}
                      aspectRatio="square"
                      disabled={isLoading}
                      maxHeight="300px" // Add a max height to prevent excessive scrolling
                    />
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end border-t pt-4">
              <Button
                onClick={() => {
                  if (generationMethod === "text-to-image") {
                    handleGenerate(prompt)
                  } else {
                    // For image-to-coloring, we don't need a prompt
                    handleGenerate("")
                  }
                }}
                disabled={
                  isLoading ||
                  (generationMethod === "text-to-image" && !prompt.trim()) || // Only check prompt for text-to-image
                  (generationMethod === "image-to-coloring" && !uploadedImage) || // Check for image in image-to-coloring
                  (user && user.credits < (generationMethod === "text-to-image" ? numImages : 1))
                }
                className="bg-gradient-to-r from-pastel-pink to-pastel-purple"
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Credits Info Card */}
          <Card className="mt-4 shadow-sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Available Credits</p>
                  <p className="text-2xl font-bold">{user?.credits || 0}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/subscription")}>
                  Get More Credits
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Area - Second on mobile, first on desktop */}
        <div className="lg:col-span-3 lg:order-1 order-2" ref={outputAreaRef}>
          {renderPreviewArea()}
        </div>
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={previewImageUrl}
        prompt={prompt}
      />

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Not enough credits</DialogTitle>
            <DialogDescription>
              {generationMethod === "text-to-image" ? (
                <>
                  You need {numImages} credit{numImages > 1 ? "s" : ""} to generate {numImages} image
                  {numImages > 1 ? "s" : ""}, but you only have {user?.credits || 0} credit
                  {user?.credits !== 1 ? "s" : ""} left.
                </>
              ) : (
                <>
                  You need 1 credit to convert your image to a coloring page, but you only have {user?.credits || 0}{" "}
                  credit
                  {user?.credits !== 1 ? "s" : ""} left.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => router.push("/dashboard/subscription")}>Upgrade</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
