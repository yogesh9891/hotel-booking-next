import express from "express";
import {
    registerAttributeValue,
    deleteById,
    bulkUpload,
    getAttributeValue,
    updateById
} from "../controllers/attributeValue.controller";

let router = express.Router();
import { upload } from "../helpers/fileUpload";
import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/", authorizeJwt, registerAttributeValue);

router.get("/", getAttributeValue);

router.patch("/updateById/:id", authorizeJwt, updateById);

router.delete("/deleteById/:id", authorizeJwt, deleteById);
// router.post("/addAttributValue", authorizeJwt, addAttributValue);
// router.get("/getAttributeValue", authorizeJwt, getAttributeValue);

// router.patch("/updateAttributeValueById/:id", authorizeJwt, updateAttributeValueById);

// router.delete("/deleteAttributeValueById/:id", authorizeJwt, deleteAttributeValueById);

// import { upload } from "../helpers/fileUpload";
// router.post("/bulkUpload", authorizeJwt, upload.single('excel'), bulkUpload);

export default router;