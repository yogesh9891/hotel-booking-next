import express from "express";
import { decrementProductQuantity, getCart, updateCart, addToCart, increaseQuantity, removeProduct } from "../controllers/userCart.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";
let router = express.Router();

router.post("/addToCart/:id", authorizeJwt, addToCart);

router.get("/", authorizeJwt, getCart);

router.patch("/removeProduct/:id", authorizeJwt, removeProduct);
router.patch("/increaseQuantity/:id", authorizeJwt, increaseQuantity);

router.patch("/decrementProductQuantity/:id", authorizeJwt, decrementProductQuantity);

export default router;