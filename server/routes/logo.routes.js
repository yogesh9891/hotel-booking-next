import express from "express";
import { addLogo, get, updateById, deleteById, }
    from "../controllers/logo.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();
// authorizeJwt,
router.post("/", addLogo);
router.get("/", get);

router.patch("/updateById/:id", authorizeJwt, updateById); // for admin 
router.delete("/deleteById/:id", deleteById); // for admin 

export default router;