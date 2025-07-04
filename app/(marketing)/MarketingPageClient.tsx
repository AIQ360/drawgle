"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SUBSCRIPTION_PLANS } from "@/lib/subscription-plans"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Check, Clock, Calendar, Users, FileText, Layout, Layers, Palette, Pencil, Star, Zap, Globe } from "lucide-react"
import { useState } from "react"

export function MarketingPageClient() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR")

  // Exchange rate (approximate)
  const exchangeRate = 83

  // Add this before the return statement in MarketingPageClient
  const imageMap = {
    "Unicorn": "https://rhcmqpuqozvwyrffixnx.supabase.co/storage/v1/object/public/coloring-pages/private/cae7654d-bd38-46fc-b82d-c50fa5402535-1747041104711-0-a_unicorn.png",
    "Dinosaur": "https://rhcmqpuqozvwyrffixnx.supabase.co/storage/v1/object/public/coloring-pages/private/cae7654d-bd38-46fc-b82d-c50fa5402535-1747041118433-0-a_Dinosaur.png",
    "Spaceship": "https://rhcmqpuqozvwyrffixnx.supabase.co/storage/v1/object/public/coloring-pages/private/cae7654d-bd38-46fc-b82d-c50fa5402535-1747041139347-0-a_Spaceship_outline.png",
    "Princess": "https://rhcmqpuqozvwyrffixnx.supabase.co/storage/v1/object/public/coloring-pages/private/cae7654d-bd38-46fc-b82d-c50fa5402535-1747041153427-0-a_Princess_outline.png",
    "Dragon": "https://rhcmqpuqozvwyrffixnx.supabase.co/storage/v1/object/public/coloring-pages/private/cae7654d-bd38-46fc-b82d-c50fa5402535-1747041165271-0-a_Dragon_outline.png",
    "Robot": "https://rhcmqpuqozvwyrffixnx.supabase.co/storage/v1/object/public/coloring-pages/private/cae7654d-bd38-46fc-b82d-c50fa5402535-1747041177671-0-a_Robot_outline.png",
    "Mermaid": "https://rhcmqpuqozvwyrffixnx.supabase.co/storage/v1/object/public/coloring-pages/private/cae7654d-bd38-46fc-b82d-c50fa5402535-1747041191299-0-a_Mermaid_outline.png",
    "Superhero": "https://rhcmqpuqozvwyrffixnx.supabase.co/storage/v1/object/public/coloring-pages/private/cae7654d-bd38-46fc-b82d-c50fa5402535-1747041205122-0-a_Superhero_boy.png"
  };

  return (
    <>
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating bubbles */}
          <div className="bubbles-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="bubble"
                style={{
                  "--size": `${Math.random() * 100 + 40}px`,
                  "--position": `${Math.random() * 100}%`,
                  "--time": `${Math.random() * 2 + 2}s`,
                  "--delay": `${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Floating shapes */}
          <div className="shapes-container">
            {["circle", "squiggle"].map((shape, i) => (
              <div
                key={i}
                className={`floating-shape ${shape}`}
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Crayon-style heading */}
          <div className="crayon-container mb-8 md:mb-12">
            <h1 className="crayon-text text-center text-5xl md:text-7xl font-bold leading-tight text-black drop-shadow-lg">
              Create Custom  
              <span className="block md:inline relative">
                <span className="relative z-10 magic-text"> Coloring Pages</span>
              </span>
              With Drawgle
            </h1>
          </div>

         {/* Fun subheading */}
<p className="text-xl md:text-2xl text-center max-w-2xl mx-auto mb-10 font-medium drop-shadow-md">
  Turn <span className="text-yellow-600 font-bold">ANY</span> idea into a
  <span className="text-pink-600 font-bold"> MAGICAL </span>
  coloring adventure with our <span className="text-blue-600 font-bold">SUPER-DUPER</span> AI!
</p>

          {/* Bouncing CTA */}
          <div className="flex justify-center mb-12">
            <Link href="/sign-up">
              <Button
                size="md"
                className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 rounded-md text-lg px-3 py-3 h-auto font-bold shadow-xl"
              >
                Create Your FREE Magic Page!
                <Star className="ml-2 h-5 w-5 star-spin" />
              </Button>
            </Link>
          </div>

             {/* Animated example showcase */}
          <div className="relative max-w-4xl mx-auto">
            <div className="example-showcase p-2 bg-white rounded-2xl shadow-rainbow overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Unicorn", "Dinosaur", "Spaceship", "Princess", "Dragon", "Robot", "Mermaid", "Superhero"].map(
                  (item, i) => (
                    <div key={i} className="example-item">
                      <div className="h-28 md:h-36 bg-gray-100 rounded-lg overflow-hidden border">
                        <img
                          src={imageMap[item] || "/placeholder.svg"}
                          alt={`${item} coloring page`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-center text-xs md:text-sm mt-1 font-medium text-indigo-800">{item}</p>
                    </div>
                  ),
                )}
              </div>

              <div className="magic-wand">
                <Zap className="wand-icon" />
              </div>
            </div>

            {/* Pencil character positioned at corner */}
            <div className="absolute -top-12 -right-8 transform rotate-45">
              <div className="pencil-character" style={{ transform: "scale(0.4)" }}>
                <div className="pencil-body"></div>
                <div className="pencil-face">
                  <div className="pencil-eye left"></div>
                  <div className="pencil-eye right"></div>
                  <div className="pencil-mouth"></div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-5 -left-5 floating-badge bg-pink-400 text-white font-bold">COOL!</div>
          </div>

          {/* Fun facts ticker */}
          <div className="ticker-wrap mt-12">
            <div className="ticker">
              <div className="ticker-item">🎨 5 FREE coloring pages!</div>
              <div className="ticker-item">✏️ No credit card needed!</div>
              <div className="ticker-item">🚀 Ready in seconds!</div>
              <div className="ticker-item">🖨️ Print at home!</div>
              <div className="ticker-item">🎮 Fun for all ages!</div>
              <div className="ticker-item">🎨 5 FREE coloring pages!</div>
              <div className="ticker-item">✏️ No credit card needed!</div>
              <div className="ticker-item">🚀 Ready in seconds!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Parents & Teachers Love It Section */}
      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Parents & Teachers Love It</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-[800px] mx-auto">
              We solve real problems for busy adults who want to engage kids in creative activities
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm transition-all hover:shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <Icons.search className="h-6 w-6 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">No More Searching for Printables</h3>
              <p className="text-gray-600">
                Everything's custom, age-appropriate, and made just for your child. No more settling for generic pages
                they lose interest in after 2 minutes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm transition-all hover:shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <Icons.clock className="h-6 w-6 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Save Time, Every Week</h3>
              <p className="text-gray-600">
                Stop digging through Pinterest or printing 20 pages hoping one works. Just type what your kids are into
                right now and print exactly what you need.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm transition-all hover:shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <Icons.help className="h-6 w-6 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Turn Special Moments into Keepsakes</h3>
              <p className="text-gray-600">
                Convert photos into memories your kids can color and keep. Family photos, classroom pictures, and
                special moments become personalized activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coloring Book Generator Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge variant="outline" className="bg-primary/10 text-primary border-0 px-3 py-1">
              NEW FEATURE
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Create Your Own Coloring Books
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-lg">
              Turn your favorite coloring pages into beautiful, printable PDF books
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-5">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Layout className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Arrange Pages Your Way</h3>
                    <p className="text-gray-600">
                      Drag and drop to organize your coloring pages in any order. Create themed collections or mix and
                      match your favorites.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Custom AI-Generated Covers</h3>
                    <p className="text-gray-600">
                      Create professional-looking book covers with our AI. Just describe what you want, and we'll
                      generate a beautiful cover image.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Customization Options</h3>
                    <p className="text-gray-600">
                      Add page numbers, blank pages between coloring pages, adjust border width, and personalize your
                      book with titles and subtitles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Print-Ready PDF Format</h3>
                    <p className="text-gray-600">
                      Download your book as a high-quality PDF that's ready to print at home or at a print shop. Perfect
                      for gifts, classroom activities, or personal use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/sign-up" passHref>
                  <Button size="lg" className="bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-sm text-white">
                    Create Your First Book
                    <BookOpen className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 mt-2">Only 10 credits per book</p>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl bg-white p-4">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/placeholder.svg?height=400&width=600&text=Coloring+Book+Builder"
                    alt="Coloring book builder interface"
                    className="w-full h-full object-cover rounded-lg"
                  />

                  {/* Book preview overlay */}
                  <div className="absolute bottom-4 right-4 w-1/3 aspect-[3/4] bg-white rounded-md shadow-lg overflow-hidden border-4 border-white">
                    <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Feature highlights */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <Pencil className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs font-medium">Custom Cover</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <Layout className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs font-medium">Page Order</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <FileText className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs font-medium">PDF Download</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300/10 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

{/* Text to Coloring Page Feature - Modern Redesign */}
<section className="w-full py-24 md:py-32 overflow-hidden relative">
  {/* Background elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 -z-10"></div>
  <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-pastel-pink/10 to-transparent rounded-full blur-3xl -z-10"></div>
  <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-pastel-purple/10 to-transparent rounded-full blur-3xl -z-10"></div>
  
  <div className="container px-4 md:px-6 relative">
    {/* Main content container with offset grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-16 items-center">
      
      {/* Left content area */}
      <div className="lg:col-span-5 lg:col-start-1 z-10">
        {/* Feature label */}
        <div className="inline-flex items-center mb-6 bg-white py-1 px-4 rounded-full shadow-sm border border-gray-100">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pastel-pink to-pastel-purple mr-2"></div>
          <span className="text-sm font-medium bg-gradient-to-r from-pastel-pink to-pastel-purple bg-clip-text text-transparent">
            Text to Coloring Page
          </span>
        </div>
        
        {/* Main heading with gradient underline */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
          Your imagination, <br />instantly illustrated
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-full mb-8"></div>
        
        {/* Description with larger text */}
        <p className="text-xl text-gray-700 mb-10 leading-relaxed">
          "I need a dinosaur playing soccer" — and just like that, it's ready to print. No more compromising with whatever generic pages you can find online.
        </p>
        
        {/* Feature list with modern styling */}
        <div className="space-y-6 mb-10">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100">
                <Check className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Personalized creativity</h4>
              <p className="text-gray-600">Create exactly what your kids are interested in <strong>right now</strong></p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Educational alignment</h4>
              <p className="text-gray-600">Match your classroom curriculum with custom educational pages</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100">
                <Layers className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Endless variations</h4>
              <p className="text-gray-600">Generate multiple designs to keep kids engaged longer</p>
            </div>
          </div>
        </div>
        
        {/* CTA with floating elements */}
        <div className="relative">
          <Link href="/sign-up" passHref>
            <Button size="lg" className="bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-sm px-8 py-6 h-auto text-base shadow-lg">
              Try it now — it's free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-gray-50 rounded-full -z-10"></div>
        </div>
      </div>
      
      {/* Right content area - Interactive demo */}
      <div className="lg:col-span-7 lg:col-start-6">
        <div className="relative">
          {/* Main image with floating UI elements */}
          <div className="rounded-xl overflow-hidden shadow-2xl bg-white relative z-10">
            {/* Demo image */}
            <div className="aspect-[4/3]">
              <img
                src="/text-to-coloring-demo.png"
                alt="Text to coloring page example"
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Floating prompt input */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-5/6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200">
              <div className="flex items-center">
                <div className="flex-1 bg-gray-100 rounded-md px-4 py-2 text-sm text-gray-600">
                  "A dinosaur playing soccer with friends"
                </div>
                <div className="ml-2 w-8 h-8 rounded-md bg-gradient-to-r from-pastel-pink to-pastel-purple flex items-center justify-center text-white">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            {/* Process steps with modern styling */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm p-8">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="absolute h-0.5 w-16 bg-white/30 top-5 left-10"></div>
                  <p className="text-white text-sm font-medium">Describe</p>
                </div>
                
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="absolute h-0.5 w-16 bg-white/30 top-5 left-10"></div>
                  <p className="text-white text-sm font-medium">Generate</p>
                </div>
                
                <div>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <p className="text-white text-sm font-medium">Print & Color</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-pastel-pink to-pastel-purple rounded-full opacity-20 blur-2xl -z-10"></div>
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-pastel-blue to-pastel-green rounded-full opacity-20 blur-2xl -z-10"></div>
          
          {/* Floating result examples */}
          <div className="absolute -bottom-10 -right-5 w-28 h-28 bg-white rounded-lg shadow-lg overflow-hidden border-4 border-white rotate-6 z-20">
            <img
              src="/placeholder.svg?height=100&width=100&text=Dinosaur+Coloring"
              alt="Sample coloring result"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute -top-8 -left-5 w-24 h-24 bg-white rounded-lg shadow-lg overflow-hidden border-4 border-white -rotate-6 z-20">
            <img
              src="/placeholder.svg?height=100&width=100&text=Soccer+Coloring"
              alt="Sample coloring result"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Image to Coloring Page Feature - Enhanced */}
      <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto max-w-[500px]">
                {/* Before-After Showcase */}
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="aspect-[4/3]">
                    <div className="absolute inset-0 grid grid-cols-2">
                      {/* Original Photo */}
                      <div className="relative overflow-hidden">
                        <img
                          src="/family-photo-original.jpg"
                          alt="Original family photo"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Original
                          </div>
                        </div>
                      </div>

                      {/* Converted Coloring Page */}
                      <div className="relative overflow-hidden border-l border-gray-200">
                        <img
                          src="/family-photo-coloring.png"
                          alt="Converted to coloring page"
                          className="absolute inset-0 w-full h-full object-cover bg-white"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Coloring Page
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive elements */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Icons.arrowRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  {/* Process indicator */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <div className="w-8 h-1 rounded-full bg-white/50"></div>
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <div className="w-8 h-1 rounded-full bg-white/50"></div>
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>

                {/* Sample results gallery */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                    <img
                      src="/sample-coloring-1.png"
                      alt="Sample coloring page"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                    <img
                      src="/sample-coloring-2.png"
                      alt="Sample coloring page"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                    <img
                      src="/sample-coloring-3.png"
                      alt="Sample coloring page"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pastel-green/30 rounded-full blur-xl -z-10"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pastel-yellow/30 rounded-full blur-xl -z-10"></div>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-5 order-1 lg:order-2">
              <Badge variant="outline" className="w-fit bg-pastel-green/10 text-primary border-0 px-3 py-1">
                Photo to Coloring Page
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Turn Memories Into Creative Activities
              </h2>
              <p className="text-lg text-gray-600 max-w-[600px]">
                Transform any photo into a beautiful coloring page that kids will actually want to color. Family photos,
                classroom pictures, vacation memories—all become personalized activities in seconds.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-1 mt-1">
                    <Icons.check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Create meaningful keepsakes from family photos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-1 mt-1">
                    <Icons.check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Turn classroom photos into personalized end-of-year gifts</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-1 mt-1">
                    <Icons.check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Perfect for birthday parties, family reunions, and special events
                  </span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/sign-up" passHref>
                  <Button size="lg" className="bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-sm">
                    Transform Your Photos Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Simplified */}
      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full">
              Simple Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[700px] text-gray-600 md:text-lg">
              Three simple steps to create your perfect coloring page
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Describe or Upload</h3>
              <p className="text-gray-600">Type what you want or upload a photo. It's that simple.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">AI Creates</h3>
              <p className="text-gray-600">Our AI transforms your input into a beautiful coloring page in seconds.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Print & Enjoy</h3>
              <p className="text-gray-600">Download, print, and watch your kids enjoy their custom creation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge variant="outline" className="bg-pastel-purple/10 text-primary border-0 px-3 py-1">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Loved by Parents and Teachers
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-lg">
              See what our users are saying about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm relative">
                {/* Quote mark */}
                <div className="absolute top-6 right-6 text-gray-200">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 5 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V15C10 16.0609 9.57857 17.0783 8.82843 17.8284C8.07828 18.5786 7.06087 19 6 19H5M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V15C20 16.0609 19.5786 17.0783 18.8284 17.8284C18.0783 18.5786 17.0609 19 16 19H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="mb-6">
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Icons.star
                          key={i}
                          className={cn("h-5 w-5", i < testimonial.rating ? "text-yellow-400" : "text-gray-300")}
                          fill={i < testimonial.rating ? "currentColor" : "none"}
                        />
                      ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>

                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Use Cases Section - Modern Redesign */}
<section className="w-full py-24 md:py-32 bg-gray-50">
  <div className="container px-4 md:px-6">
    {/* Section header with minimal styling */}
    <div className="max-w-3xl mx-auto mb-20">
      <div className="inline-block h-1 w-12 bg-primary mb-6"></div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How Drawgle transforms creative experiences</h2>
      <p className="text-xl text-gray-600 leading-relaxed">
        Our platform adapts to different needs, providing tailored solutions for various creative scenarios.
      </p>
    </div>
    
    {/* Modern asymmetrical layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-12">
      {/* Left column - For Parents */}
      <div className="lg:col-span-5  lg:top-24 self-start">
        <div className="relative">
          {/* Decorative element */}
          <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-pastel-pink to-pastel-purple"></div>
          
          <div className="pl-6">
            <div className="text-sm uppercase tracking-wider text-primary font-medium mb-4">For Parents</div>
            <h3 className="text-3xl font-bold mb-6">Spark joy and creativity at home</h3>
            <p className="text-gray-600 text-lg mb-8">
              Create custom coloring pages that engage your children's imagination and keep them entertained for hours.
            </p>
            
            <Link href="/sign-up" passHref>
              <Button className="bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-sm px-8">
                Start creating
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right column - Parent use cases */}
      <div className="lg:col-span-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Use case cards with modern styling */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Special occasions</h4>
            <p className="text-gray-600">
              Create themed coloring activities for birthday parties, playdates, and family gatherings.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Rainy day activities</h4>
            <p className="text-gray-600">
              Generate new activities in seconds when kids are bored or when the weather keeps you indoors.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
              <Image className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Family memories</h4>
            <p className="text-gray-600">
              Transform vacation pictures and family photos into memorable keepsakes children can color.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Educational support</h4>
            <p className="text-gray-600">
              Create educational coloring pages that reinforce learning concepts in a fun, engaging way.
            </p>
          </div>
        </div>
      </div>
      
      {/* Spacer */}
      <div className="lg:col-span-12 h-px bg-gray-100 my-8 lg:my-0"></div>
      
      {/* Left column - Teacher use cases */}
      <div className="lg:col-span-7 order-2 lg:order-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Use case cards with modern styling */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Curriculum support</h4>
            <p className="text-gray-600">
              Generate pages that reinforce what you're teaching, from science concepts to historical events.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Class keepsakes</h4>
            <p className="text-gray-600">
              Create end-of-year keepsakes from class photos that students will treasure for years to come.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Special events</h4>
            <p className="text-gray-600">
              Design themed activities for holidays, cultural celebrations, and special school events.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Classroom management</h4>
            <p className="text-gray-600">
              Create quick activities for early finishers or as calming exercises during transitions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right column - For Teachers */}
      <div className="lg:col-span-5 order-1 lg:order-2 lg:top-24 self-start">
        <div className="relative">
          {/* Decorative element */}
          <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-pastel-pink to-pastel-purple"></div>
          
          <div className="pl-6">
            <div className="text-sm uppercase tracking-wider text-primary font-medium mb-4">For Teachers</div>
            <h3 className="text-3xl font-bold mb-6">Enhance learning through creativity</h3>
            <p className="text-gray-600 text-lg mb-8">
              Create educational coloring pages that reinforce learning concepts and engage students in a fun, interactive way.
            </p>
            
            <Link href="/sign-up" passHref>
              <Button className="bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-sm px-8">
                Explore for classrooms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge variant="outline" className="bg-pastel-green/10 text-primary border-0 px-3 py-1">
              Pricing
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[700px] text-gray-600 md:text-lg">Choose the plan that works for you</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full">
              <div
                className={`flex items-center space-x-1 ${currency === "INR" ? "bg-white shadow-sm rounded-full p-1 px-3" : "p-1 px-3"}`}
              >
                <span
                  className={`text-sm font-medium cursor-pointer ${currency === "INR" ? "text-primary" : "text-gray-600"}`}
                  onClick={() => setCurrency("INR")}
                >
                  ₹ INR
                </span>
              </div>
              <div
                className={`flex items-center space-x-1 ${currency === "USD" ? "bg-white shadow-sm rounded-full p-1 px-3" : "p-1 px-3"}`}
              >
                <span
                  className={`text-sm font-medium cursor-pointer ${currency === "USD" ? "text-primary" : "text-gray-600"}`}
                  onClick={() => setCurrency("USD")}
                >
                  $ USD
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Object.entries(SUBSCRIPTION_PLANS).map(([id, plan]) => (
              <div
                key={id}
                className={cn(
                  "bg-white rounded-xl overflow-hidden border transition-all hover:shadow-md",
                  id === "starter" && "ring-2 ring-primary relative",
                )}
              >
                {id === "starter" && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-6">
                  <div className={`inline-block w-fit rounded-full ${plan.color} px-3 py-1 text-sm text-white mb-4`}>
                    {plan.name}
                  </div>

                  <div className="flex items-baseline mb-1">
                    {currency === "INR" ? (
                      <>
                        <span className="text-4xl font-bold">₹{Math.round(plan.price * exchangeRate)}</span>
                        <span className="text-gray-500 ml-1">/month</span>
                        <span className="text-sm ml-2 bg-gray-100 px-2 py-1 rounded-full">${plan.price}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-gray-500 ml-1">/month</span>
                        <span className="text-sm ml-2 bg-gray-100 px-2 py-1 rounded-full">
                          ₹{Math.round(plan.price * exchangeRate)}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6">{plan.credits} credits per month</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="rounded-full bg-green-100 p-1 mt-0.5 flex-shrink-0">
                          <Icons.check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/sign-up" passHref>
                    <Button
                      className={cn(
                        "w-full",
                        id === "starter" ? "bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-sm" : "bg-gray-900 hover:bg-gray-800",
                      )}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500">
              All plans include unlimited downloads and access to both text-to-image and photo-to-coloring features.
              <br />
              <span className="text-xs mt-1 inline-block">
                {currency === "INR"
                  ? "Prices shown in INR and USD. USD pricing is approximate and may vary based on exchange rates."
                  : "Prices shown in USD and INR. INR pricing is approximate and may vary based on exchange rates."}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge variant="outline" className="bg-pastel-purple/10 text-primary border-0 px-3 py-1">
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[700px] text-gray-600 md:text-lg">
              Find answers to common questions about our coloring pages
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 gradient-bg">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-0 px-3 py-1">
              Get Started Today
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl max-w-[800px]">
              Ready to Create Coloring Pages Your Kids Will Actually Love?
            </h2>
            <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-300">
              Join thousands of parents and teachers who are creating custom coloring pages with AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/sign-up" passHref>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8">
                  Create Your First Page Free
                </Button>
              </Link>
              <Link href="/gallery" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Browse Gallery
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              No credit card required. 5 free coloring pages included.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

// Features data
const features = [
  {
    title: "AI-Powered Generation",
    description: "Create custom coloring pages from text descriptions in seconds using advanced AI.",
    icon: <Icons.globe className="h-6 w-6 text-primary" />,
  },
  {
    title: "Multiple Styles",
    description: "Choose from various styles and themes to create the perfect coloring page.",
    icon: <Icons.media className="h-6 w-6 text-primary" />,
  },
  {
    title: "Instant Downloads",
    description: "Download your coloring pages instantly and print them at home.",
    icon: <Icons.download className="h-6 w-6 text-primary" />,
  },
  {
    title: "Custom Prompts",
    description: "Describe exactly what you want or use our prompt suggestions.",
    icon: <Icons.post className="h-6 w-6 text-primary" />,
  },
  {
    title: "Different Sizes",
    description: "Create coloring pages in different aspect ratios for various uses.",
    icon: <Icons.settings className="h-6 w-6 text-primary" />,
  },
  {
    title: "Public Gallery",
    description: "Share your creations with the community or browse for inspiration.",
    icon: <Icons.eye className="h-6 w-6 text-primary" />,
  },
]

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Parent of 3",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "My kids love the custom coloring pages I create for them. It's so easy to make pages with their favorite characters and themes!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Elementary Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "I use this for my classroom activities. Being able to create educational coloring pages that match our curriculum is amazing.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Daycare Provider",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The kids at my daycare center are always excited when I bring new coloring pages. This tool has been a lifesaver!",
    rating: 4,
  },
]

// FAQ data
const faqs = [
  {
    question: "How many coloring pages can I create?",
    answer:
      "The number of coloring pages you can create depends on your subscription plan. Free accounts get 5 pages per month, while paid plans offer 200-500 pages monthly.",
  },
  {
    question: "Can I request specific content in my coloring pages?",
    answer:
      "Yes! You can describe exactly what you want in your coloring page using the prompt field. You can specify characters, scenes, themes, and more.",
  },
  {
    question: "What age range are these coloring pages suitable for?",
    answer:
      "Our coloring pages are designed to be suitable for children of all ages. You can create simpler designs for younger children and more complex ones for older kids and adults.",
  },
  {
    question: "Can I download and print the coloring pages?",
    answer:
      "Yes, all coloring pages can be downloaded as high-quality PNG files that are ready to print. You can print them at home or at any print shop.",
  },
  {
    question: "Do I need to create an account to use the service?",
    answer:
      "Yes, you need to create an account to generate coloring pages. We offer a free tier that includes 5 coloring pages per month with no credit card required.",
  },
]
