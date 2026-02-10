import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().min(2, "First name is required"),
  lastName: z.string().optional(),
  businessName: z.string().optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})
