import express from "express";
import {
  addPaymentGateway,
  deleteById,
  get,
  updateById,
} from "../controllers/paymentGateway.controller";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

// router.post("/", authorizeJwt, addPaymentGateway);

// router.get("/", get);

// router.patch("/updateById/:id", authorizeJwt, updateById);

// router.delete("/deleteById/:id", authorizeJwt, deleteById);

export default router;
