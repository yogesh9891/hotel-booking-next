import express from "express";
import { addFAQ, deleteById, getFAQForUser, getFAQ, updateById, updateDocumentStatus, getById, }
    from "../controllers/FAQ.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();
// , authorizeJwt
router.post("/", addFAQ);

router.get("/", getFAQ); // for admin  
router.get("/getById/:id", getById); // for admin  
router.get("/getFAQ", authorizeJwt, getFAQForUser);
router.patch("/updateById/:id", authorizeJwt, updateById); // for admin 

router.delete("/deleteById/:id", authorizeJwt, deleteById);

router.patch("/updateStatus/:id", authorizeJwt, updateDocumentStatus); // for admin 

export default router;