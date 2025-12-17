import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// food
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

// user authentication
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("hey");
});

app.listen(5000, () => {
  console.log("Server is running http://localhost:5000");
});
