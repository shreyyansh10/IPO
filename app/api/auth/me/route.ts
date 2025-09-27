import { type NextRequest, NextResponse } from "next/server"

// Temporary user database (same as login)
const TEMP_USERS = [
  {
    id: "1",
    email: "demo@ipoplatform.com",
    name: "Demo User",
    panNumber: "ABCDE1234F",
    trustScore: 85,
    isVerified: true,
    avatar: "/professional-indian-man.png",
  },
  {
    id: "2",
    email: "investor@example.com",
    name: "Rajesh Kumar",
    panNumber: "FGHIJ5678K",
    trustScore: 92,
    isVerified: true,
    avatar: "/professional-indian-woman.png",
  },
  {
    id: "3",
    email: "newuser@example.com",
    name: "Priya Sharma",
    panNumber: "LMNOP9012Q",
    trustScore: 67,
    isVerified: false,
    avatar: null,
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token || !token.startsWith("temp_token_")) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Extract user ID from token
    const userId = token.split("_")[2]
    const user = TEMP_USERS.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
