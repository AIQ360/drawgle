"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Check } from "lucide-react"
import axios from "axios"
import PayPalButton from "./paypal-button"
import CouponInput from "./coupon-input"

interface PricingTableProps {
  userId: string
}

type PackageKey = "starter" | "access"

type CreditPackage = {
  title: string
  price: number
  credits: number
  features: string[]
}

const creditPackages: { [key in PackageKey]: CreditPackage } = {
  starter: {
    title: "Starter",
    price: 9,
    credits: 200,
    features: [
      "Text prompt generation",
      "200 Coloring Pages/month",
      "For hobby / personal use",
      "Download and print unlimited times",
      "Create custom coloring books",
    ],
  },
  access: {
    title: "Access to All",
    price: 18,
    credits: 500,
    features: [
      "Text prompt generation",
      "500 Coloring Pages/month",
      "Includes names/words/numbers",
      "For teachers / parents / more advanced use",
      "Download and print unlimited times",
      "Create custom coloring books",
      "Priority support",
    ],
  },
}

const PricingTable: React.FC<PricingTableProps> = ({ userId }) => {
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discount: number
    applicablePlans: string[]
  } | null>(null)
  const [buttonKey, setButtonKey] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [razorpayKey, setRazorpayKey] = useState<string | null>(null)

  useEffect(() => {
    const fetchRazorpayKey = async () => {
      try {
        const response = await axios.get("/api/razorpay/client-config")
        if (response.data?.publicKey) {
          setRazorpayKey(response.data.publicKey)
        }
      } catch (error) {
        console.error("Failed to fetch Razorpay key:", error)
        toast({
          title: "Error",
          description: "Failed to load payment configuration.",
          variant: "destructive",
        })
      }
    }

    fetchRazorpayKey()
  }, [])

  const handleApplyCoupon = (discount: number, applicablePlans: string[]) => {
    setAppliedCoupon({ code: "WELCOME15", discount, applicablePlans })
    setButtonKey((prev) => prev + 1)
  }

  const getDisplayPrice = (packageKey: PackageKey) => {
    const creditPackage = creditPackages[packageKey]
    if (appliedCoupon && appliedCoupon.applicablePlans.includes(packageKey)) {
      return (creditPackage.price * (1 - appliedCoupon.discount / 100)).toFixed(2)
    }
    return creditPackage.price.toFixed(2)
  }

  const handleRazorpayPayment = async (packageKey: PackageKey) => {
    try {
      if (!razorpayKey) {
        toast({
          title: "Error",
          description: "Payment system is not ready yet. Please try again.",
          variant: "destructive",
        })
        return
      }

      setIsProcessing(true)

      const creditPackage = creditPackages[packageKey]
      const amount =
        appliedCoupon && appliedCoupon.applicablePlans.includes(packageKey)
          ? creditPackage.price * (1 - appliedCoupon.discount / 100)
          : creditPackage.price

      // Create payment on the server
      const response = await axios.post("/api/razorpay/create-payment", {
        amount,
        currency: "USD",
        packageKey,
        credits: creditPackage.credits,
      })

      if (!response.data?.orderId) {
        throw new Error("Failed to create payment order")
      }

      const { orderId } = response.data

      // Use the Razorpay checkout with the fetched key
      const options = {
        key: razorpayKey,
        amount: amount * 100,
        currency: "USD",
        name: "Drawgle",
        description: `Purchase ${creditPackage.credits} Credits`,
        order_id: orderId,
        handler: async (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          try {
            const verificationResponse = await axios.post("/api/razorpay/verify", {
              orderCreationId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              amount,
              userId,
              credits: creditPackage.credits,
            })

            if (verificationResponse.data.isOk) {
              toast({
                title: "Payment Successful",
                description: "Your credits have been updated.",
                duration: 2000,
              })
              setTimeout(() => window.location.reload(), 2000)
            } else {
              throw new Error(verificationResponse.data.message || "Verification failed")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            toast({
              title: "Error",
              description: "Payment verification failed.",
              variant: "destructive",
            })
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#14b8a6",
        },
      }

      // Create a new script element for Razorpay
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => {
        // Once the script is loaded, we can initialize Razorpay
        // @ts-ignore - Razorpay is loaded from the script
        const paymentObject = new window.Razorpay(options)
        paymentObject.on("payment.failed", (response: any) => {
          toast({
            title: "Payment Failed",
            description: response.error.description || "Please try again.",
            variant: "destructive",
          })
        })
        paymentObject.open()
      }
      document.body.appendChild(script)
    } catch (error) {
      console.error("Error handling Razorpay payment:", error)
      toast({
        title: "Error",
        description: "Failed to process payment.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center py-12">
        <div className="max-w-7xl w-full flex-col flex text-center items-center justify-center mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold mb-4">Get More Credits for Your Coloring Pages</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create beautiful coloring pages for your kids with our affordable credit packages.
            </p>
          </div>

          <CouponInput onApplyCoupon={handleApplyCoupon} />

          <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-8">
            {Object.entries(creditPackages).map(([packageKey, creditPackage]) => {
              const isDiscounted = appliedCoupon && appliedCoupon.applicablePlans.includes(packageKey)
              return (
                <Card
                  key={packageKey}
                  className="rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:ring-1 hover:ring-primary/50 w-full max-w-md"
                >
                  <CardHeader className="bg-gray-50 p-6 text-center">
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                      {creditPackage.title} Package
                    </CardTitle>

                    <div className="mt-4">
                      {isDiscounted ? (
                        <>
                          <span className="text-xl text-gray-500 line-through">${creditPackage.price}</span>
                          <strong className="text-3xl font-bold text-gray-900 ml-2">
                            ${getDisplayPrice(packageKey as PackageKey)}
                          </strong>
                        </>
                      ) : (
                        <strong className="text-3xl font-bold text-gray-900">${creditPackage.price}</strong>
                      )}
                      <span className="text-sm font-medium text-gray-700"> / {creditPackage.credits} Credits</span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <ul className="space-y-3 mb-6">
                      {creditPackage.features.map((feature, index) => (
                        <li key={`${packageKey}-feature-${index}`} className="flex items-start gap-2 text-gray-700">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 space-y-4">
                      <PayPalButton
                        key={`${packageKey}-${buttonKey}`}
                        packageKey={packageKey as PackageKey}
                        userId={userId}
                        couponCode={appliedCoupon?.code}
                      />

                      <Button
                        className="w-full bg-[#3c99ff] hover:bg-[#3485dc]"
                        onClick={() => handleRazorpayPayment(packageKey as PackageKey)}
                        disabled={isProcessing || !razorpayKey}
                      >
                        {isProcessing ? "Processing..." : "Pay With Razorpay"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">How Credits Work</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>1 credit</strong> = 1 coloring page generation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Generate from <strong>text prompts</strong> or <strong>upload images</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Download and print</strong> as many times as you want
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Create coloring books</strong> from your generated pages
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">Why Choose Our Coloring Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>High-quality</strong> line art perfect for coloring
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Customizable</strong> - create exactly what your kids want
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Educational</strong> - create pages that match what they're learning
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Family photos</strong> to coloring pages - create meaningful keepsakes
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-500">
              All plans include unlimited downloads and access to both text-to-image and photo-to-coloring features.
              <br />
              <span className="text-xs mt-1 inline-block">
                Prices shown in USD and INR. INR pricing is approximate and may vary based on exchange rates.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PricingTable
