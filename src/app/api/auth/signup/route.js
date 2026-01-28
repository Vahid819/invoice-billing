import { connectDB } from "@/lib/db"
import User from "@/model/User"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function POST(req) {
  await connectDB()
  const body = await req.json()

  const { name, lastName, businessName, email, password } = body

  // 1️⃣ FIND EXISTING USER (CREATED DURING OTP)
  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return Response.json(
      { message: "Please verify OTP first" },
      { status: 400 }
    )
  }

  // 2️⃣ ENSURE OTP IS VERIFIED
  if (!user.otpVerified) {
    return Response.json(
      { message: "OTP not verified" },
      { status: 401 }
    )
  }

  // 3️⃣ UPDATE ALL REMAINING FIELDS ✅
  user.name = name
  user.lastName = lastName
  user.businessName = businessName
  user.password = await bcrypt.hash(password, 10)
  user.verified = true
  user.isLogin = true
  user.lastLogin = new Date()

  // OPTIONAL: cleanup OTP fields
  user.otpHash = null
  user.otpExpiresAt = null
  user.otpAttempts = 0

  await user.save()

  // 4️⃣ CREATE JWT (AUTO LOGIN)
  const token = await new SignJWT({
    userId: user._id.toString(),
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret)

  // 5️⃣ SET AUTH COOKIE
  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  })

  return Response.json({
    message: "Account created successfully",
  })
}
