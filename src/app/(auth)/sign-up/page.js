"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Separator } from "@/components/ui/separator"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Chrome } from "lucide-react"
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
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
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    // ✅ Zod validation
    const parsed = signupSchema.safeParse(form)
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
        alert("Account created successfully")
      }
    } catch {
      setErrors({ general: "Server error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="
  relative min-h-screen flex items-center justify-center px-4
  bg-linear-to-br from-zinc-100 via-white to-zinc-200
  dark:from-zinc-950 dark:via-zinc-900 dark:to-black
  overflow-hidden
">
      {/* Cinematic light effects */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-15%] right-[-10%] w-150 h-150 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute top-[30%] right-[20%] w-75 h-75 bg-pink-500/10 rounded-full blur-3xl" />


      <Card className="
    w-full max-w-md
    rounded-2xl
    bg-white/70 dark:bg-zinc-900/60
    backdrop-blur-xl
    border border-white/20 dark:border-white/10
    shadow-2xl shadow-black/10
  ">
        <CardHeader className="text-center">
          <CardTitle>
            Create Your Billing & Invoice Account
          </CardTitle>

          <CardDescription>
            Manage clients, generate GST-ready invoices, and track payments — all in one place.
          </CardDescription>

        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* First Name */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>First Name</FieldLabel>
                <FieldContent>
                  <Input name="name" onChange={handleChange} placeholder="Jonah" />
                </FieldContent>
                <FieldError>{errors.name?.[0]}</FieldError>
              </Field>

              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <FieldContent>
                  <Input name="lastName" onChange={handleChange} placeholder="Hill" />
                </FieldContent>
              </Field>
            </div>

            {/* Business Name */}
            <Field>
              <FieldLabel>Business Name</FieldLabel>
              <FieldContent>
                <Input name="businessName" onChange={handleChange} placeholder="jonhill industry" />
              </FieldContent>
              <FieldError>{errors.businessName?.[0]}</FieldError>
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent className="flex gap-2">
                <Input name="email" type="email" onChange={handleChange} placeholder="jonhill@gmail.com" />
                {form.email && (
                  <Button type="button" onClick={() => setOtpSent(true)}>
                    Send OTP
                  </Button>
                )}
              </FieldContent>
              <FieldError>{errors.email?.[0]}</FieldError>
            </Field>

            {/* OTP */}
            {otpSent && (
              <Field>
                <FieldLabel>OTP</FieldLabel>
                <FieldContent>
                  <InputOTP
                    maxLength={6}
                    value={form.otp}
                    onChange={(v) => setForm({ ...form, otp: v })}
                  >
                    <InputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FieldContent>
                <FieldError>{errors.otp?.[0]}</FieldError>
              </Field>
            )}

            {/* Password */}
            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldContent className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </FieldContent>
              <FieldError>{errors.password?.[0]}</FieldError>
            </Field>

            {errors.general && (
              <p className="text-red-500 text-center">{errors.general}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
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
