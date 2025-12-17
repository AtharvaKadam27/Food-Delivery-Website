import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
  directOrder,
} from "../controllers/OrderContoller.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);

router.post("/direct", authMiddleware, directOrder);

router.post("/verify", verifyOrder);

router.post("/userorders", authMiddleware, userOrders);

router.get("/list", listOrders);

router.post("/status", updateStatus);

export default router;
