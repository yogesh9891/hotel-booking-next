import express from "express";
let router = express.Router();

import {
    addcommission,
    getCommission,
    updateById,
    deleteById,

} from "../controllers/adminCommission.controller";

import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/", authorizeJwt, addcommission);

router.get("/", authorizeJwt, getCommission);

router.patch("/updateById/:id", authorizeJwt, updateById);

router.delete("/deleteById/:id", authorizeJwt, deleteById);

export default router;