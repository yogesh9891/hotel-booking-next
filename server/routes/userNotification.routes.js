import express from "express";

import { deleteNotification, getNotfication, createNotification, updateNotification } from "../controllers/userNotification.controller"
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();

router.post("/", createNotification);

router.get("/", getNotfication);

router.delete("/deleteById/:id", authorizeJwt, deleteNotification);

router.patch("/updateById/:id", authorizeJwt, updateNotification);

export default router;