import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";
import { upload } from "../helpers/fileUpload";

import {
  addNew,
  bulkUploadCollection,
  deleteById,
  getAll,
  getFromSlug,
  updateById,
} from "../controllers/collection.controller";

router.post("/", addNew); //

router.get("/getCollection", getAll); //
router.get("/getFromSlug/:id", getFromSlug); //

// authorizeJwt,
router.patch("/updateById/:id", updateById); //

router.delete("/deleteById/:id", deleteById); //

export default router;
