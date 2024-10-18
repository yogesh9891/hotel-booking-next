import express from "express";
import {
  cancelOrderById,
  createCodOrder,
  createGuestOrder,
  createOrder,
  getAllActiveOrders,
  getAllActiveOrdersByUserId,
  getOrderById,
  paymentCallback,
  phonepePaymentStatusCheck,
  updateStatusOrderById,
} from "../controllers/Order.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();

router.post("/createOrder", authorizeJwt, createOrder);
router.post("/createCodOrder", authorizeJwt, createCodOrder);

router.get("/paymentCallback/:orderId", paymentCallback);
router.get("/phonepePaymentStatusCheck/:orderId", phonepePaymentStatusCheck);
router.get("/getAllActiveOrders", getAllActiveOrders);
router.get(
  "/getAllActiveOrdersByUserId",
  authorizeJwt,
  getAllActiveOrdersByUserId
);

router.post(`/createGuestOrder`, createGuestOrder);
router.get(`/getOrderById/:id`, getOrderById);
// router.post(`/cancelOrderById/:id`, cancelOrderById);
router.patch(`/updateStatusOrderById/:id`, updateStatusOrderById);

// router.get("/emailSend/:orderId",authorizeJwt, paymentCallback);

export default router;
