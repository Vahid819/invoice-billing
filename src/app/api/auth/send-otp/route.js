import { Resend } from "resend"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import User from "../../../../model/User"
import OtpEmail from "../../../../emails/otpEmail"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  await connectDB()

  const { email, name } = await req.json()

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const otpHash = await bcrypt.hash(otp, 10)

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

  await User.findOneAndUpdate(
    { email },
    {
      email,
      name,
      otpHash,
      otpExpiresAt: expiresAt,
      otpVerified: false,
      otpLastSentAt: new Date(),
    },
    { upsert: true }
  )

  // 📧 Send OTP Email
  await resend.emails.send({
    from: "Billing App <vahidmomin.dev@gmail.com>",
    to: email,
    subject: "Your OTP Code",
    react: <OtpEmail name={name || "User"} otp={otp} />,
  })

  // ✅ SUCCESS LOG
  console.log(`✅ OTP email sent successfully to ${email}`)

  return Response.json({ message: "OTP sent successfully" })
}
