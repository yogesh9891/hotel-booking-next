import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

import {
    addReview,
    deleteById,
    updateById,
    getReview,
    updateProductReview,
    getReviewForUser
} from "../controllers/productReview.controller";

router.post("/", addReview); // for user can 

router.get("/", authorizeJwt, getReview); // only for admin ,s ubadmin

router.get("/getForUser", getReviewForUser); // only for  user

router.patch("/updateById/:id", authorizeJwt, updateById); // only for admin ,s ubadmin

router.delete("/deleteById/:id", authorizeJwt, deleteById); // only for admin ,s ubadmin

router.patch("/upadteReviewStatus/:id", authorizeJwt, updateProductReview); // only for admin ,s ubadmin

export default router;