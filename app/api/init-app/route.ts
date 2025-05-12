import { NextResponse } from "next/server"

// This route is now simplified since we're handling storage manually
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "App initialized successfully",
    })
  } catch (error: any) {
    console.error("Error in init-app route:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Something went wrong",
      },
      { status: 500 },
    )
  }
}
