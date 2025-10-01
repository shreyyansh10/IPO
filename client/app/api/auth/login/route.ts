import { type NextRequest, NextResponse } from "next/server"

// Temporary user database
const TEMP_USERS = [
  {
    id: "1",
    email: "demo@ipoplatform.com",
    password: "demo123",
    name: "Demo User",
    panNumber: "ABCDE1234F",
    trustScore: 85,
    isVerified: true,
    avatar: "/professional-indian-man.png",
  },
  {
    id: "2",
    email: "investor@example.com",
    password: "investor123",
    name: "Rajesh Kumar",
    panNumber: "FGHIJ5678K",
    trustScore: 92,
    isVerified: true,
    avatar: "/professional-indian-woman.png",
  },
  {
    id: "3",
    email: "newuser@example.com",
    password: "newuser123",
    name: "Priya Sharma",
    panNumber: "LMNOP9012Q",
    trustScore: 67,
    isVerified: false,
    avatar: null,
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user with matching credentials
    const user = TEMP_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create a simple JWT-like token (in production, use proper JWT)
    const token = `temp_token_${user.id}_${Date.now()}`

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
