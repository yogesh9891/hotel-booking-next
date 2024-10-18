import express from "express";
import { addAttribute, addAttributValue, deleteAttributeValueById, deleteById, getAttribute, bulkUpload, getAttributeValue, updateAttributeValueById, updateById } from "../controllers/attribute.controller";
let router = express.Router();
import { upload } from "../helpers/fileUpload";
import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/addAttribute", authorizeJwt, addAttribute);

router.get("/getAttribute", getAttribute);

router.patch("/updateById/:id", authorizeJwt, updateById);

router.delete("/deleteById/:id", authorizeJwt, deleteById);
router.post("/addAttributValue", authorizeJwt, addAttributValue);
router.get("/getAttributeValue", authorizeJwt, getAttributeValue);

router.patch("/updateAttributeValueById/:id", authorizeJwt, updateAttributeValueById);

router.delete("/deleteAttributeValueById/:id", authorizeJwt, deleteAttributeValueById);

// import { upload } from "../helpers/fileUpload";
router.post("/bulkUpload", authorizeJwt, upload.single('excel'), bulkUpload);

export default router;