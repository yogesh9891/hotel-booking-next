import express from "express";
import { addPolicy, get, updateById, deleteById, }
    from "../controllers/policy.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();
// authorizeJwt,
router.post("/", addPolicy);
router.get("/", get);

router.patch("/updateById/:id", authorizeJwt, updateById); // for admin 
router.delete("/deleteById/:id", authorizeJwt, deleteById); // for admin 

export default router;