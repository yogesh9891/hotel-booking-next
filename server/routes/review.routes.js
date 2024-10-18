import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

import {
  addReview,
  deleteById,
  updateById,
  getReview,
  updateProductReview,
  getReviewForUser,
  addAdminReview,
  getById,
  getReviewByHotelId,
} from "../controllers/review.controller";

router.post("/", authorizeJwt, addReview); // for user can
router.post("/addAdminReview", authorizeJwt, addAdminReview); // for user can
router.get("/getById/:id", getById); //

router.get("/", authorizeJwt, getReview); // only for admin ,s ubadmin
router.get("/getReviewByHotelId/:id", getReviewByHotelId); // only for admin ,s ubadmin

router.get("/getForUser", getReviewForUser); // only for  user

router.patch("/updateById/:id", authorizeJwt, updateById); // only for admin ,s ubadmin

router.delete("/deleteById/:id", authorizeJwt, deleteById); // only for admin ,s ubadmin

export default router;
