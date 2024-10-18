import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";
import { upload } from "../helpers/fileUpload";

import {
  addNew,
  bulkUploadLocation,
  deleteById,
  getAll,
  getFromSlug,
  updateById,
} from "../controllers/location.controller";

router.post("/", addNew); //

router.get("/getLocation", getAll); //
router.get("/getFromSlug/:id", getFromSlug); //

// authorizeJwt,
router.patch("/updateById/:id", updateById); //

router.delete("/deleteById/:id", deleteById); //

export default router;
