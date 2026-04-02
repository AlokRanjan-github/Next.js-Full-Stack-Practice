import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("Mongodb URI not found")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const connectDb = async () => {
    if (cached.conn) {
        console.log("Cached DB connected")
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((c) => c.connection)
    }
    try {
        cached.conn = await cached.promise
        console.log("DB connected")
    } catch (error) {
        cached.promise = null
        throw error
    }
    return cached.conn
}

export default connectDb;