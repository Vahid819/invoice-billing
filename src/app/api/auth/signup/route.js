import connectDB from "@/lib/db"
import User from "@/models/User"
import { signupSchema } from "@/schemas/userSignupSchema"
import bcrypt from "bcryptjs"

export async function POST(req) {
  await connectDB()
  const body = await req.json()

  console.log("Signup request body:", body)

  // 1️⃣ Validate input using Zod
  const parsed = signupSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { name, lastName, businessName, email, password } = parsed.data

  // 2️⃣ Find user created during OTP
  const user = await User.findOne({ email })

  if (!user) {
    return Response.json(
      { message: "Please verify email first" },
      { status: 404 }
    )
  }

  // 3️⃣ Check OTP verification
  if (!user.otpVerified) {
    return Response.json(
      { message: "OTP not verified" },
      { status: 403 }
    )
  }

  // 4️⃣ Complete signup
  user.name = name
  user.lastName = lastName
  user.businessName = businessName
  user.password = await bcrypt.hash(password, 10)
  user.verified = true

  // 5️⃣ Cleanup OTP fields
  user.otpHash = null
  user.otpExpiresAt = null
  user.otpAttempts = 0

  await user.save()

  return Response.json({ message: "Signup completed successfully" })
}
