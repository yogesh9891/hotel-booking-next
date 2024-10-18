import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

import {
    addReview,
    deleteById,
    updateById,
    getReview,
    updateReview,
    getReviewForUser
} from "../controllers/sellerReview.controller";


router.post("/", addReview); // 

router.get("/", authorizeJwt, getReview); // 

router.get("/getForUser", getReviewForUser); //

router.patch("/updateById/:id", authorizeJwt, updateById); // 

router.delete("/deleteById/:id", authorizeJwt, deleteById); // 

router.patch("/approveReview/:id", authorizeJwt, updateReview); //

export default router;