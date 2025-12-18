import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("Your mongodb URL")
    .then(() => console.log("DB Connected"));
};

