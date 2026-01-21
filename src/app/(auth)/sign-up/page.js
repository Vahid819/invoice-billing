"use client"

import { useState } from "react"
import Link from "next/link"
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
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-black px-4">
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/70 dark:bg-zinc-900/60 border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold">
            Create Your Billing Account
          </CardTitle>
          <CardDescription>
            Verify your email using OTP
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input placeholder="Vahid" />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input placeholder="Shaikh" />
            </div>
          </div>

          {/* Business */}
          <div>
            <Label>Business Name</Label>
            <Input placeholder="Vahid Enterprises" />
          </div>

          {/* Email + Send OTP */}
          <div className="space-y-2">
            <Label>Email</Label>

            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {email && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOtpSent(true)}
                >
                  Send OTP
                </Button>
              )}
            </div>
          </div>

          {/* OTP using shadcn InputOTP */}
          {otpSent && (
            <div className="space-y-2">
              <Label>OTP</Label>

              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <p className="text-xs text-muted-foreground">
                Enter the 6-digit OTP sent to your email
              </p>
            </div>
          )}

          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <Button className="w-full">
            Create Account
          </Button>

          <Separator />

          <Button variant="outline" className="w-full flex gap-2">
            <Chrome className="h-4 w-4" />
            Sign up with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
