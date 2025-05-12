// Define subscription plans
export const SUBSCRIPTION_PLANS = {
  free: {
    name: "Free",
    price: 0,
    credits: 5,
    features: ["5 Coloring Pages/month", "Text prompt generation", "For personal use"],
    color: "bg-gray-500",
  },
  starter: {
    name: "Starter",
    price: 9,
    credits: 200,
    features: ["Text prompt generation", "200 Coloring Pages/month", "For hobby / personal use"],
    color: "bg-green-500",
  },
  access: {
    name: "Access to All",
    price: 18,
    credits: 500,
    features: [
      "Text prompt generation",
      "500 Coloring Pages/month",
      "Includes names/words/numbers",
      "For teachers / parents / more advanced use",
    ],
    color: "bg-purple-500",
  },
}

export type SubscriptionTier = keyof typeof SUBSCRIPTION_PLANS
