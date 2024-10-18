import express from "express";
import { addMenu, deleteById, getMenu, updateById, swapMenu, sortMenu, getMenuForAdmin } from "../controllers/menu.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";
let router = express.Router();

router.post("/", authorizeJwt, addMenu); //only for ADMIN, subadmin
router.post("/swapMenu", authorizeJwt, swapMenu); //only for ADMIN, subadmin


router.get("/getMenu", authorizeJwt, getMenuForAdmin); //only for ADMIN, subadmin
router.get("/get", authorizeJwt, getMenu); //only for  user

router.patch("/updateById/:id", authorizeJwt, updateById); //only for ADMIN subadmin

router.delete("/deleteById/:id", authorizeJwt, deleteById); //only for ADMIN subadmin

router.get("/sortMenu", authorizeJwt, sortMenu); //only for ADMIN, subadmin
// router.get("/swapMenu", authorizeJwt, swapMenu); //only for ADMIN, subadmin
export default router;