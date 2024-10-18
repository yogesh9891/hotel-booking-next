import express from "express";
let router = express.Router();

import { deleteById, getSubscription, create, updateById, subscribe }
from "../controllers/subscription.controller"

import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/", authorizeJwt, create);
router.post("/", subscribe);
router.get("/", authorizeJwt, getSubscription);

router.patch("/updateById/:id", authorizeJwt, updateById);
router.delete("/deleteById/:id", authorizeJwt, deleteById);

export default router;