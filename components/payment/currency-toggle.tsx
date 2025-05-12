"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface CurrencyToggleProps {
  onChange: (currency: "INR" | "USD") => void
  defaultCurrency?: "INR" | "USD"
}

export function CurrencyToggle({ onChange, defaultCurrency = "INR" }: CurrencyToggleProps) {
  const [isUSD, setIsUSD] = useState(defaultCurrency === "USD")

  const handleToggle = (checked: boolean) => {
    setIsUSD(checked)
    onChange(checked ? "USD" : "INR")
  }

  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      <Label htmlFor="currency-toggle" className={`text-sm font-medium ${!isUSD ? "text-primary" : "text-gray-500"}`}>
        ₹ INR
      </Label>
      <Switch
        id="currency-toggle"
        checked={isUSD}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-primary"
      />
      <Label htmlFor="currency-toggle" className={`text-sm font-medium ${isUSD ? "text-primary" : "text-gray-500"}`}>
        $ USD
      </Label>
    </div>
  )
}
