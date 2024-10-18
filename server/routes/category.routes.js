import express from "express";
import {
    addCategory,
    deleteById,
    getCategory,
    getNestedCategory,
    updateById,
    getChildCategoryByParentId,
    getSpecialEdition,
    bulkUpload
} from "../controllers/category.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";
import { upload } from "../helpers/fileUpload";

// import multer from "multer";
let router = express.Router();

router.post("/addCategory", addCategory);

router.get("/getCategory", getCategory);

router.patch("/updateById/:id", updateById);

router.delete("/deleteById/:id", deleteById);

router.get("/getNestedCategories", getNestedCategory);

router.get("/getChildCategory/:id", getChildCategoryByParentId);

router.get("/specialEdition", getSpecialEdition);
// import { upload } from "../helpers/fileUpload";
router.post("/bulkUpload", authorizeJwt, upload.single('excel'), bulkUpload);
export default router;