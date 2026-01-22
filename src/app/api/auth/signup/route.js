import connectDB from "@/lib/db"
import User from "@/models/User"
import {signupSchema} from "@/schemas/userSignupSchema"
import bcrypt from "bcryptjs"

export async function POST(req) {
  await connectDB()
  const body = await req.json()

  console.log("Signup request body:", body);

  const parsed = signupSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { name, lastName, businessName, email, password } = parsed.data

  const exists = await User.findOne({ email })
  if (exists) {
    return Response.json({ message: "Email already exists" }, { status: 409 })
  }

  await User.create({
    name,
    lastName,
    businessName,
    email,
    password: await bcrypt.hash(password, 10),
    verified: true,
  })

  return Response.json({ message: "User created successfully" })
}
