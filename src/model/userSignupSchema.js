import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().min(2, "First name required"),
  lastName: z.string().min(2).optional(),
  businessName: z.string().min(2, "Business name required"),
  email: z.string().email("Invalid email"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  password: z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    "Weak password"
  ),
})
