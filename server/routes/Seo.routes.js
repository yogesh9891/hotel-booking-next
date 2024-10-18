import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";
import { upload } from "../helpers/fileUpload";

import { addNew, bulkUploadSeo, deleteById, getAll, getSeoByUrl, updateById } from "../controllers/seo.controller";

router.post("/", addNew); //

router.get("/getSeo", getAll); //
router.get("/getSeoByUrl", getSeoByUrl); //

// authorizeJwt,
router.patch("/updateById/:id", updateById); //

router.delete("/deleteById/:id", deleteById); //

export default router;
