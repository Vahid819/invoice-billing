import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("❌ MONGODB_URL is not defined");
}

// Global cache (Next.js / serverless safe)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {

  // Already connected
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  try {
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URL, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      });
    }

    cached.conn = await cached.promise;
    console.log("✓ MongoDB connected");
    return cached.conn;

  } catch (error) {
    cached.promise = null;
    console.error("✗ MongoDB connection error:", error.message);
    throw error;
  }
};
