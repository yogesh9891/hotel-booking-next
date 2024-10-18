import express from "express";

import { deleteNotification, getNotfication, createNotification, updateNotification } from "../controllers/sellerNotification.controller"
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();

router.post("/", createNotification);

router.get("/", getNotfication);

router.patch("/updateById/:id", authorizeJwt, updateNotification);

router.delete("/deleteById/:id", authorizeJwt, deleteNotification);

export default router;