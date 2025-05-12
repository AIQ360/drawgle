"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import axios from "axios"

// Extend the Window interface to include the PayPal SDK
declare global {
  interface Window {
    paypal: any
  }
}

interface PayPalButtonProps {
  packageKey: string
  userId: string
  couponCode?: string
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ packageKey, userId, couponCode }) => {
  const paypalRef = useRef<HTMLDivElement | null>(null)
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const buttonInstanceRef = useRef<any>(null)

  const addPayPalScript = () => {
    if (window.paypal) {
      setPaypalScriptLoaded(true)
      return
    }
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`
    script.async = true
    script.onload = () => setPaypalScriptLoaded(true)
    script.onerror = (e) => {
      console.error("Failed to load PayPal script.", e)
      setError("Failed to load PayPal script.")
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    addPayPalScript()
  }, [])

  useEffect(() => {
    if (paypalScriptLoaded && paypalRef.current && !buttonInstanceRef.current) {
      try {
        buttonInstanceRef.current = window.paypal
          .Buttons({
            fundingSource: window.paypal.FUNDING.PAYPAL,
            style: {
              color: "black",
              label: "pay",
              shape: "pill",
            },
            createOrder: async (data: any, actions: any) => {
              setLoading(true)
              try {
                console.log("Creating order with packageKey:", packageKey, "couponCode:", couponCode)
                const response = await axios.post("/api/paypal/create-order", {
                  packageKey,
                  userId,
                  couponCode,
                })
                console.log("Server returned orderId:", response.data.orderId)
                if (response.status !== 200 || !response.data.orderId) {
                  throw new Error("Invalid order ID from server")
                }
                return response.data.orderId
              } catch (error: any) {
                console.error("Error creating PayPal order:", error)
                const errorMessage = error.response?.data?.message || error.message || "Failed to create PayPal order."
                setError(errorMessage)
                toast.error("PayPal Error", {
                  description: errorMessage,
                })
                throw error
              } finally {
                setLoading(false)
              }
            },
            onApprove: async (data: any, actions: any) => {
              setLoading(true)
              try {
                const details = await actions.order.capture()
                const amount = Number.parseFloat(details.purchase_units[0].amount.value)
                console.log("Captured amount from PayPal:", amount)

                // Add delay to ensure webhook has time to process
                await new Promise((resolve) => setTimeout(resolve, 1000))

                const response = await axios.post("/api/paypal", {
                  orderId: data.orderID,
                  payerId: userId,
                  amount,
                  packageKey,
                  couponCode,
                })

                console.log("Payment processing response:", response.data)

                toast.success("Payment Successful", {
                  description: "Your credits have been updated.",
                })

                // Reload after a short delay to show the success message
                setTimeout(() => window.location.reload(), 2000)
              } catch (error: any) {
                console.error("Error during payment capture:", error)

                // Even if our API call fails, the payment might have been processed by the webhook
                // So we'll show a more optimistic message
                toast.info("Payment Received", {
                  description: "Your payment was received. Credits will be updated shortly.",
                })

                // Still reload after a delay
                setTimeout(() => window.location.reload(), 3000)
              } finally {
                setLoading(false)
              }
            },
            onError: (err: any) => {
              console.error("PayPal Checkout error:", err)
              setError("Payment failed. Please try again.")
              toast.error("Payment Error", {
                description: "There was an error with PayPal. Please try again.",
              })
              setLoading(false)
            },
          })
          .render(paypalRef.current)
      } catch (error) {
        console.error("Error rendering PayPal buttons:", error)
        setError("Failed to initialize PayPal checkout.")
      }

      return () => {
        if (buttonInstanceRef.current) {
          buttonInstanceRef.current.close && buttonInstanceRef.current.close()
          buttonInstanceRef.current = null
        }
      }
    }
  }, [paypalScriptLoaded, packageKey, userId, couponCode])

  return (
    <div>
      <div ref={paypalRef} className="mt-4"></div>
      {loading && <p className="text-center text-sm text-muted-foreground mt-2">Processing...</p>}
      {error && <p className="text-center text-sm text-destructive mt-2">{error}</p>}
    </div>
  )
}

export default PayPalButton
