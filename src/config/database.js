import mongoose from "mongoose";

let isConnected = false;

async function connectMongodb(url) {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  // Ensure strict query if needed, or other options
  // mongoose.set('strictQuery', true);

  try {
    const db = await mongoose.connect(url);
    isConnected = db.connections[0].readyState;
    console.log("New mongodb connection established");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Don't throw, let the app crash or handle usage of db elsewhere
  }
}

export { connectMongodb };
