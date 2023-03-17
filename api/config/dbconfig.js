import mongoose from "mongoose";

const connectDB = async (url) => {
  console.log("DB Connected");
  return await mongoose.connect(url);
};

export default connectDB;
