import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("MongoDB Coneected");
  } catch (error) {
    console.log(error);
  }
};
