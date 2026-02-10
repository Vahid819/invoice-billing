import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

export async function POST(req) {
  await connectDB()

  const { email, otp } = await req.json()

  // 1️⃣ Basic validation
  if (!email || !otp) {
    return Response.json(
      { message: "Email and OTP are required" },
      { status: 400 }
    )
  }

  const user = await User.findOne({ email })

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 })
  }

  // 2️⃣ Already verified
  if (user.otpVerified) {
    return Response.json({ message: "OTP already verified" })
  }

  // 3️⃣ Too many attempts
  if (user.otpAttempts >= 5) {
    return Response.json(
      { message: "Too many attempts. Please resend OTP." },
      { status: 429 }
    )
  }

  // 4️⃣ OTP expired or missing
  if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
    return Response.json(
      { message: "OTP expired. Please resend OTP." },
      { status: 400 }
    )
  }

  // 5️⃣ Compare OTP
  const valid = await bcrypt.compare(otp, user.otpHash)

  if (!valid) {
    user.otpAttempts += 1
    await user.save()
    return Response.json({ message: "Invalid OTP" }, { status: 401 })
  }

  // 6️⃣ OTP verified successfully
  user.otpVerified = true
  user.verified = true // email verified
  user.otpHash = null
  user.otpExpiresAt = null
  user.otpAttempts = 0

  await user.save()

  return Response.json({ message: "OTP verified successfully" })
}
