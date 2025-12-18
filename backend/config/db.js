import mongoose from "mongoose";
// mongodb+srv://atharvak396_db_user:rG6sjMMLd7AqeOd2@cluster1.n3etp0u.mongodb.net/?appName=Cluster1
export const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/mern")
    .then(() => console.log("DB Connected"));
};

// import mongoose from "mongoose";

// export const connectDB = async () => {
//   // Use the environment variable, fallback to local if not found
//   const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/mern";

//   await mongoose
//     .connect(dbURI)
//     .then(() => console.log("DB Connected"))
//     .catch((err) => console.error("DB Connection Error:", err));
// };
