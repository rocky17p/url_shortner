import mongoose from "mongoose";

async function connectMongodb(url) {
  return mongoose.connect(url).then(() => console.log("mongodb connected"));
}

export { connectMongodb };
