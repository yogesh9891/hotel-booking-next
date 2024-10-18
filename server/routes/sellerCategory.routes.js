import express from "express";

import { add, deleteById, get, update } from "../controllers/sellerCategory.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();

router.post("/", authorizeJwt, add);

router.get("/", get);

router.patch("/updateById/:id", authorizeJwt, update);

router.delete("/deleteById/:id", authorizeJwt, deleteById);

export default router;