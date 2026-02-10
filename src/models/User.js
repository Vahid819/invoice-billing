import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    businessName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // 🔐 Password set ONLY after OTP verification
    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    // 🔐 OTP AUTH FIELDS
    otpHash: String,

    otpExpiresAt: Date,

    otpAttempts: {
      type: Number,
      default: 0,
    },

    otpVerified: {
      type: Boolean,
      default: false,
    },

    // ✅ Account verification
    verified: {
      type: Boolean,
      default: false,
    },

    isLogin: {
      type: Boolean,
      default: false,
    },

    lastLogin: Date,
  },
  { timestamps: true }
)

export default mongoose.models.User ||
  mongoose.model("User", UserSchema)
