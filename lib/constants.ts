export const SITE_NAME = "Drawgle"
export const SITE_DESCRIPTION =
  "Create custom coloring pages from text or photos in seconds. Perfect for parents, teachers, and kids."
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.drawgle.in"

export const ASPECT_RATIOS = {
  square: {
    label: "Square",
    value: "1:1",
  },
  portrait: {
    label: "Portrait",
    value: "3:4",
  },
  landscape: {
    label: "Landscape",
    value: "4:3",
  },
}
