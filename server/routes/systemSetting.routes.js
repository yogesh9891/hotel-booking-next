import express from "express";
import { addSystemSetting, deleteById, getSystemSetting, getSystemSettingForUser, updateById } from "../controllers/systemSetting.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";
let router = express.Router();

router.post("/", authorizeJwt, addSystemSetting); //only for ADMIN, subadmin

router.get("/getMenu", authorizeJwt, getSystemSetting); //only for ADMIN, subadmin
router.get("/get", authorizeJwt, getSystemSettingForUser); //only for  user

router.patch("/updateById/:id", authorizeJwt, updateById); //only for ADMIN subadmin
router.delete("/deleteById/:id", authorizeJwt, deleteById); //only for ADMIN subadmin

export default router;