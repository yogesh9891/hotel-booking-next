import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

import { addNew, bulkUploadCity, deleteById, generateSiteMap, getAll, updateById } from "../controllers/HomePage.controller";
import { upload } from "../helpers/fileUpload";

router.post("/", addNew); //

router.get("/getHomePage?", getAll); //

// authorizeJwt,
router.patch("/updateById/:id", updateById); //

router.delete("/deleteById/:id", deleteById); //
router.get("/generateSiteMap", generateSiteMap); //
router.post("/bulkUploadCity", upload.single("excel"), bulkUploadCity);

export default router;
