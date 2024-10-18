import express from "express";
let router = express.Router();
import { addAmenityCategory, deleteAmenityCategory, getAmenityCategory, updateAmenityCategory } from "../controllers/amenityCategory.controller";

import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/", addAmenityCategory);

router.get("/getAmenityCategory", getAmenityCategory);

router.patch("/updateById/:id", updateAmenityCategory);

router.delete("/deleteById/:id", deleteAmenityCategory);

export default router;