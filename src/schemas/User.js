import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
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
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Please enter a valid email address",
            ],
            index: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            ],
            minlength: 6,
            select: false, // IMPORTANT: hide password by default
        },

        verifiedCode: {
            type: String,
        },

        verified: {
            type: Boolean,
            default: false,
        },

        islogin: {
            type: Boolean,
            default: true,
        },

        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Prevent model overwrite in Next.js
export default mongoose.models.User ||
    mongoose.model("User", UserSchema);
