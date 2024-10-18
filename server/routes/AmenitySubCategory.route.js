import express from "express";
let router = express.Router();
import { addAmenitySubCategory, deleteAmenitySubCategory, getAmenitySubCategory, updateAmenitySubCategory } from "../controllers/amenitySubCategory.controller";

import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/", authorizeJwt, addAmenitySubCategory);

router.get("/getAmenitySubCategory", authorizeJwt, getAmenitySubCategory);

router.patch("/updateById/:id", authorizeJwt, updateAmenitySubCategory);

router.delete("/deleteById/:id", authorizeJwt, deleteAmenitySubCategory);

export default router;