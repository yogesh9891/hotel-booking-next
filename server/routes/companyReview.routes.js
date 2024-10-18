import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

import {
    addReview,
    deleteById,
    updateById,
    getReview,
    updateByIdForAdmin,

} from "../controllers/companyReview.controller";

router.post("/", addReview); // for user can 

router.get("/", authorizeJwt, getReview); // only for admin ,subadmin

router.patch("/updateById/:id", authorizeJwt, updateById); // only for user

router.delete("/deleteById/:id", authorizeJwt, deleteById); // only for admin ,s ubadmin

router.patch("/updateByIdForAdmin/:id", authorizeJwt, updateByIdForAdmin); // only for admin ,s ubadmin
export default router;