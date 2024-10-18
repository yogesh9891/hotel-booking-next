import express from "express";
let router = express.Router();

import { deleteById, getSubscription, create, updateById, subscribe, getMail, addMail, getById, downloadExcelFile }
from "../controllers/contactInfo.controller"

import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/", addMail);
router.get("/", getMail);
router.get("/getById/:id", getById);

router.delete("/deleteById/:id", deleteById);
router.get("/download", downloadExcelFile)


export default router;