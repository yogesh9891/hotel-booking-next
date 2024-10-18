import express from "express";
import {
  getUserById,
  login,
  loginAdmin,
  otpLogin,
  registerAdmin,
  registerUser,
  sendOtpApi,
  updateUser,
  verifyOtpApi,
} from "../controllers/users.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
// ,

router.get("/getById/:id", authorizeJwt, getUserById);
router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);
router.post("/sendOtp", sendOtpApi);
router.post("/verifyOtp", verifyOtpApi);
router.post("/otpLogin", otpLogin);
router.patch("/updateUser", authorizeJwt,updateUser);


export default router;
