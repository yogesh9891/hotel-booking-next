import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

import {
    addReviewSetting,
    deleteById,
    // updateById,
    getReviewSetting,

} from "../controllers/reviewSetting.controller";

router.post("/", authorizeJwt, addReviewSetting); // only for admin ,s ubadmin

router.get("/getreviewSetingByUserId/:id", authorizeJwt, getReviewSetting); // only for admin ,s ubadmin

// router.patch("/updateById/:id", authorizeJwt, updateById); // only for admin ,s ubadmin

// router.delete("/deleteById/:id", authorizeJwt, deleteById); // only for admin ,s ubadmin

export default router;