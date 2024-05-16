import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
