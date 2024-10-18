import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";
import { deleteById, getTag, createTag, updateById, productSearchFromTagId, bulkUpload } from "../controllers/tag.controller"
import { upload } from "../helpers/fileUpload";

router.post("/createTag", authorizeJwt, createTag);

router.get("/getTag", getTag);

router.patch("/updateById/:id", authorizeJwt, updateById);

router.delete("/deleteById/:id", authorizeJwt, deleteById);

router.get("/productSearchFromTagId/:id", productSearchFromTagId);

// import { upload } from "../helpers/fileUpload";
router.post("/bulkUpload", authorizeJwt, upload.single('excel'), bulkUpload);
export default router;