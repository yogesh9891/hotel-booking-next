import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";
import { upload } from "../helpers/fileUpload";

import { addNew, bulkUploadCountry, deleteById, getAll, updateById } from "../controllers/country.controller";

router.post("/", addNew); //

router.get("/getCountry", getAll); //

// authorizeJwt,
router.patch("/updateById/:id", updateById); //

router.delete("/deleteById/:id", deleteById); //
router.post("/bulkUploadCountry", upload.single("excel"), bulkUploadCountry);

export default router;
