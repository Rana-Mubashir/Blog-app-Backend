import mongoose from "mongoose";
import { config } from "dotenv";

config();

async function connectDb() {
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URL}`)
        if (db) {
            console.log("database connected successfully");
        }
    } catch (error) {
        console.log("Error in connecting database", error)
    }
}

export { connectDb }