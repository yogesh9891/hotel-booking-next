import express from "express";
import { addMainMenu, deleteById, getMainMenu, updateById } from "../controllers/mainMenu.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";
let router = express.Router();

router.post("/", authorizeJwt, addMainMenu); //only for ADMIN, subadmin

router.get("/get", authorizeJwt, getMainMenu); //only for ADMIN, subadmin

// router.get("/", authorizeJwt, getMenu); //only 

router.patch("/updateById/:id", authorizeJwt, updateById); //only for ADMIN subadmin
router.delete("/deleteById/:id", authorizeJwt, deleteById); //only for ADMIN subadmin

export default router;