import express from "express";
import { addMail, downloadQrCode, deleteById, getMail, downloadExcelFile } from "../controllers/contactInfo.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";
let router = express.Router();

router.post("/", addMail);
// authorizeJwt,
router.get("/", getMail); //only for ADMIN, subadmin
// authorizeJwt,
router.delete("/deleteById/:id", deleteById); //only for ADMIN

// router.get("/qrCode/:text", downloadQrCode) // text will be www.google.com
//     //url will be http://localhost:4015/mail/qrCode/asdf


router.get("/download", downloadExcelFile)

export default router;