"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle, X } from "lucide-react"

interface CouponInputProps {
  onApplyCoupon: (discount: number, applicablePlans: string[]) => void
}

// Coupon database (in a real app, this would be fetched from the server)
const couponDatabase: { [key: string]: { discount: number; plans: string[] } } = {
  WELCOME15: { discount: 15, plans: ["starter", "access"] },
}

const CouponInput: React.FC<CouponInputProps> = ({ onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      })
      return
    }

    setIsValidating(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const coupon = couponDatabase[couponCode.toUpperCase()]

      if (coupon) {
        setAppliedCoupon(couponCode.toUpperCase())
        onApplyCoupon(coupon.discount, coupon.plans)
        toast({
          title: "Coupon Applied",
          description: `${coupon.discount}% discount applied to your purchase!`,
        })
      } else {
        toast({
          title: "Invalid Coupon",
          description: "The coupon code you entered is invalid or expired.",
          variant: "destructive",
        })
      }

      setIsValidating(false)
    }, 500)
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    onApplyCoupon(0, [])
    toast({
      title: "Coupon Removed",
      description: "The coupon has been removed from your purchase.",
    })
  }

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {!appliedCoupon ? (
        <div className="flex gap-2">
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleApplyCoupon} disabled={isValidating || !couponCode.trim()}>
            {isValidating ? "Validating..." : "Apply"}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-2 bg-primary/10 border border-primary/20 rounded-md">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="font-medium">
              Coupon <span className="text-primary">{appliedCoupon}</span> applied!
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemoveCoupon}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default CouponInput
