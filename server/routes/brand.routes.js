import express from "express";
import { deleteById, getBrand, registerBrand, updateById, bulkUpload, downloadBrandDemo } from "../controllers/brand.controller";
import { upload } from "../helpers/fileUpload";
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();

router.post("/registerBrand", registerBrand);

router.get("/getBrand", getBrand);

router.patch("/updateById/:id", authorizeJwt, updateById);
router.delete("/deleteById/:id", authorizeJwt, deleteById);

// import { upload } from "../helpers/fileUpload";
router.post("/bulkUpload", authorizeJwt, upload.single('file'), bulkUpload);

router.get("/demoXLSX", downloadBrandDemo);

export default router;