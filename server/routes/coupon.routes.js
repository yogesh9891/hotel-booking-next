import express from "express";
import { checkValidCoupon, createDiscount, deleteById, get, updateById } from "../controllers/Coupon.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();

router.post("/", createDiscount);
router.get("/", get);

router.post("/checkValidCoupon", checkValidCoupon);

router.patch("/updateById/:id", updateById);
router.delete("/deleteById/:id", deleteById);

export default router;
