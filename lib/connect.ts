import mongoose from "mongoose";

const URL = process.env.MONGGO_URI as string;

if (!URL) {
  throw new Error("Please define the MONGGO_URL environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(URL, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("DATABASE ACTIVE");
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
