import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/CartController.js";

const router = express.Router();

router.post("/get", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);

export default router;
