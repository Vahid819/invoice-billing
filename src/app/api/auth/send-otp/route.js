import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import OtpEmail from "@/emails/otpEmail"
import { gmailTransporter } from "@/lib/mailers/gmail"
import { render } from "@react-email/render"

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

  // ✅ FIX IS HERE
  const html = await render(<OtpEmail name={name || "User"} otp={otp} />)

  await gmailTransporter.sendMail({
    from: `"Billing App" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html,
  })

  console.log(`✅ OTP email sent successfully to ${email}`)

  return Response.json({ message: "OTP sent successfully" })
}
