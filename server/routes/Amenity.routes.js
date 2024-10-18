import express from "express";
let router = express.Router();
import { addAmenity, deleteAmenity, getAmenity, updateAmenity } from "../controllers/amenity.controller";

import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/", addAmenity);

router.get("/getAmenity", getAmenity);

router.patch("/updateById/:id", updateAmenity);

router.delete("/deleteById/:id", deleteAmenity);

export default router;