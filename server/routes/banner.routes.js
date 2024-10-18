import express from "express";
import { addBanner, deleteById, getBanner, updateById, getActiveBanner } from "../controllers/banner.controller";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";
// authorizeJwt,
router.post("/addBanner", addBanner);

router.get("/getBanner", getBanner);

router.get("/getActiveBanner", getActiveBanner);

router.patch("/updateById/:id", authorizeJwt, updateById);

router.delete("/deleteById/:id", authorizeJwt, deleteById);

export default router;