"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { AspectRatio, GenerateImageParams } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatioToggle } from "@/components/dashboard/aspect-ratio-toggle"
import { NumberOfImagesToggle } from "@/components/dashboard/number-of-images-toggle"
import { PromptInput } from "@/components/dashboard/prompt-input"
import { GeneratingIndicator } from "@/components/dashboard/generating-indicator"
import { Icons } from "@/components/icons"
import { toast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        const { data } = await supabase.from("users_metadata").select("*").eq("id", session.user.id).single()

        if (data) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            ...data,
          })
        }
      } else {
        router.push("/sign-in")
      }
    }

    fetchUser()
  }, [supabase, router])

  const handleGenerate = async (inputPrompt: string) => {
    if (!user) return

    if (user.credits < numImages) {
      setShowUpgradeDialog(true)
      return
    }

    setIsLoading(true)
    setPrompt(inputPrompt)
    setGeneratedImages([])

    try {
      const params: GenerateImageParams = {
        prompt: inputPrompt,
        aspectRatio,
        numImages,
        model: "sana", // Default model, can be changed via env
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to generate images")
      }

      const data = await response.json()
      setGeneratedImages(data.images)

      // Refresh user data to get updated credits
      const { data: updatedUserData } = await supabase.from("users_metadata").select("*").eq("id", user.id).single()

      if (updatedUserData) {
        setUser({
          ...user,
          credits: updatedUserData.credits,
        })
      }

      toast({
        title: "Images generated successfully",
        description: `Used ${numImages} credit${numImages > 1 ? "s" : ""}. You have ${updatedUserData.credits} credit${updatedUserData.credits !== 1 ? "s" : ""} left.`,
      })
    } catch (error: any) {
      toast({
        title: "Error generating images",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (imageUrl: string) => {
    // Create a temporary link element
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `coloring-page-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Coloring Page</h2>
        <p className="text-muted-foreground">Generate beautiful coloring pages with AI.</p>
      </div>

      {isLoading ? (
        <GeneratingIndicator />
      ) : (
        generatedImages.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Generated Coloring Pages</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {generatedImages.map((imageUrl, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className={`aspect-${aspectRatio} relative`}>
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={`Generated coloring page ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-2 flex justify-between">
                    <Button variant="ghost" size="sm" onClick={() => window.open(imageUrl, "_blank")}>
                      <Icons.arrowRight className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(imageUrl)}>
                      <Icons.arrowRight className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      )}

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Accordion type="single" collapsible defaultValue="settings">
              <AccordionItem value="settings">
                <AccordionTrigger>General Settings</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <AspectRatioToggle value={aspectRatio} onChange={setAspectRatio} />
                    <NumberOfImagesToggle value={numImages} onChange={setNumImages} max={user?.credits || 0} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-4">
              <PromptInput onSubmit={handleGenerate} isLoading={isLoading} defaultValue={prompt} />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => handleGenerate(prompt)}
                disabled={isLoading || !prompt.trim() || (user && user.credits < numImages)}
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
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Not enough credits</DialogTitle>
            <DialogDescription>
              You need {numImages} credit{numImages > 1 ? "s" : ""} to generate {numImages} image
              {numImages > 1 ? "s" : ""}, but you only have {user?.credits || 0} credit{user?.credits !== 1 ? "s" : ""}{" "}
              left.
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
