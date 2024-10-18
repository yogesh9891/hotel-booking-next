import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

import { addNew, bulkUploadCity, deleteById, getAll, updateById } from "../controllers/City.controller";
import { upload } from "../helpers/fileUpload";

router.post("/", addNew); //

router.get("/getCity?", getAll); //

// authorizeJwt,
router.patch("/updateById/:id", updateById); //

router.delete("/deleteById/:id", deleteById); //
router.post("/bulkUploadCity", upload.single("excel"), bulkUploadCity);

export default router;
