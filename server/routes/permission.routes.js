import express from "express";
let router = express.Router();

import { deleteById, get, create, updateById }
from "../controllers/permission.controller";

import { authorizeJwt } from "../middlewares/auth.middleware";

router.post("/", authorizeJwt, create);
router.get("/", authorizeJwt, get);

router.patch("/updateById/:id", authorizeJwt, updateById);
router.delete("/deleteById/:id", authorizeJwt, deleteById);

export default router;