"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signupSchema } from "@/schemas/userSignupSchema"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Chrome } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    businessName: "",
    email: "",
    otp: "",
    password: "",
  })

  const handleChange = (e) => {
    setErrors({})
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // SEND OTP
  const handleSendOtp = async () => {
    if (!form.name || !form.email) {
      setMessage("Please enter name and email first")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.message || "Failed to send OTP")
        return
      }

      setOtpSent(true)
      setMessage("OTP sent to your email")
    } catch {
      setMessage("Server error while sending OTP")
    } finally {
      setLoading(false)
    }
  }

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!form.otp) {
      setMessage("Please enter OTP")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.message || "OTP verification failed")
        return
      }

      setOtpVerified(true)
      setMessage("OTP verified. Create your password.")
    } catch {
      setMessage("Server error during OTP verification")
    } finally {
      setLoading(false)
    }
  }

  // FINAL SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setMessage("")

    if (!otpVerified) {
      setMessage("Please verify OTP first")
      return
    }

    const { otp, ...payload } = form

    const parsed = signupSchema.safeParse(payload)
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors)
      return
    }

    try {
      setLoading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors({ general: data.message })
      } else {
        router.push("/dashboard") // ✅ REDIRECT
      }
    } catch {
      setErrors({ general: "Server error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-black">

      {/* Light effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <Card className="w-full max-w-md rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle>Create Your Billing & Invoice Account</CardTitle>
          <CardDescription>
            Manage clients, generate invoices, and track payments.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jonah"
                  onChange={handleChange}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Hill"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Business */}
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                placeholder="Jonah Hill Industries"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jonah@gmail.com"
                  onChange={handleChange}
                  disabled={otpSent}
                />
                {!otpSent && (
                  <Button type="button" onClick={handleSendOtp} disabled={loading}>
                    Send OTP
                  </Button>
                )}
              </div>
            </div>

            {/* OTP */}
            {otpSent && (
              <>
                <div className="space-y-2">
                  <Label>OTP</Label>
                  <InputOTP
                    maxLength={6}
                    value={form.otp}
                    onChange={(v) => setForm({ ...form, otp: v })}
                  >
                    <InputOTPGroup>
                      {[0,1,2,3,4,5].map(i => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {!otpVerified && (
                  <Button type="button" onClick={handleVerifyOtp} className="w-full">
                    Verify OTP
                  </Button>
                )}
              </>
            )}

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  onChange={handleChange}
                  disabled={!otpVerified}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password[0]}</p>
              )}
            </div>

            {message && (
              <p className="text-sm text-center text-muted-foreground">{message}</p>
            )}

            {errors.general && (
              <p className="text-sm text-center text-red-500">{errors.general}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!otpVerified || loading}
            >
              Create Account
            </Button>
          </form>

          <Separator className="my-4" />

          <Button variant="outline" className="w-full flex gap-2">
            <Chrome className="h-4 w-4" />
            Sign up with Google
          </Button>

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
