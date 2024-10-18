import express from "express";
import { addBlog, deleteById, getBlog, updateById, updateBlogStatus, getBlogBySlug } from "../controllers/blog.controller";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/", authorizeJwt, addBlog);

router.get("/", getBlog);
router.get("/getBlogBySlug/:id", getBlogBySlug);
// router.get("/getActiveBanner", getCategory);

router.patch("/updateById/:id", authorizeJwt, updateById);
router.patch("/updateBlogStatus/:id", authorizeJwt, updateBlogStatus);

router.delete("/deleteById/:id", authorizeJwt, deleteById);

export default router;