import express from "express";
let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";

import { addNew, deleteById, getAll, updateById } from "../controllers/wareHouse.controller";


router.post("/", addNew); // 

router.get("/getwareHouses", getAll); // 

// authorizeJwt,
router.patch("/updateById/:id", updateById); // 

router.delete("/deleteById/:id", deleteById); // 


export default router;