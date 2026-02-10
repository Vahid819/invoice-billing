import connectDB from "@/lib/db"
import User from "@/models/User"
import { signupSchema } from "@/schemas/userSignupSchema"
import bcrypt from "bcryptjs"

export async function POST(req) {
  await connectDB()

  const body = await req.json()

  const parsed = signupSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { name, lastName, businessName, email, password } = parsed.data

  const user = await User.findOne({ email })

  if (!user) {
    return Response.json(
      { message: "User not found. Please verify OTP first." },
      { status: 404 }
    )
  }

  if (!user.otpVerified) {
    return Response.json(
      { message: "OTP not verified" },
      { status: 403 }
    )
  }

  // ✅ UPDATE USER (IMPORTANT)
  user.name = name
  user.lastName = lastName
  user.businessName = businessName
  user.password = await bcrypt.hash(password, 10)
  user.verified = true
  user.isLogin = true

  await user.save()

  return Response.json({ message: "Account created successfully" })
}
