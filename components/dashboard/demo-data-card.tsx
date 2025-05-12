"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { toast } from "@/components/ui/use-toast"
import { addSampleImages, addDemoCredits } from "@/lib/actions/demo-data"

export function DemoDataCard() {
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [isLoadingCredits, setIsLoadingCredits] = useState(false)

  const handleAddSampleImages = async () => {
    setIsLoadingImages(true)
    try {
      const result = await addSampleImages()

      if (result.success) {
        toast({
          title: "Sample images added",
          description: "Sample coloring pages have been added to your gallery.",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      toast({
        title: "Error adding sample images",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoadingImages(false)
    }
  }

  const handleAddDemoCredits = async () => {
    setIsLoadingCredits(true)
    try {
      const result = await addDemoCredits(20)

      if (result.success) {
        toast({
          title: "Demo credits added",
          description: "20 demo credits have been added to your account.",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      toast({
        title: "Error adding demo credits",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoadingCredits(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo Options</CardTitle>
        <CardDescription>Add sample data to your account to explore the application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Add sample coloring pages to your gallery to see how they appear in the application.
          </p>
          <Button onClick={handleAddSampleImages} disabled={isLoadingImages} variant="outline">
            {isLoadingImages ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Sample Images"
            )}
          </Button>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Add 20 demo credits to your account to try generating coloring pages.
          </p>
          <Button onClick={handleAddDemoCredits} disabled={isLoadingCredits} variant="outline">
            {isLoadingCredits ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Demo Credits"
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-muted-foreground">
          These options are for demonstration purposes only and will not affect your actual subscription.
        </p>
      </CardFooter>
    </Card>
  )
}
