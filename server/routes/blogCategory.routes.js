import express from "express";
import { addBlogCategory, deleteById, getBlogCategory, updateById, getCategory, getBlogCategoryById } from "../controllers/blogCategory.controller";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/", authorizeJwt, addBlogCategory);

router.get("/", getBlogCategory);

router.get("/getBlogCategoryById/:id", getBlogCategoryById);


router.patch("/updateById/:id", authorizeJwt, updateById);

router.delete("/deleteById/:id", authorizeJwt, deleteById);

export default router;