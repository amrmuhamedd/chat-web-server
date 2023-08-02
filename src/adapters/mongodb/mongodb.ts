import mongoose from "mongoose";

const MONGODB_URI = process.env.MONOGO_URL;

export async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI as string, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export function closeMongoDBConnection() {
  mongoose.connection.close();
  console.log("Disconnected from MongoDB");
}
