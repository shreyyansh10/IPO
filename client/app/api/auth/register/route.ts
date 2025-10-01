import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Check if user already exists (simulate)
    if (email === "demo@ipoplatform.com" || email === "investor@example.com") {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: `temp_${Date.now()}`,
      email,
      name,
      panNumber: null,
      trustScore: 50, // Default trust score for new users
      isVerified: false,
      avatar: null,
    }

    // Create token
    const token = `temp_token_${newUser.id}_${Date.now()}`

    return NextResponse.json({
      user: newUser,
      token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
