import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

import { addNew, deleteById, getAll, getById, updateById } from "../controllers/Gallery.controller";


router.post("/", addNew); // 

router.get("/getGallerys", getAll); // 
router.get("/getById/:id", getById); // 

// authorizeJwt,
router.patch("/updateById/:id", updateById); // 

router.delete("/deleteById/:id", deleteById); // 


export default router;