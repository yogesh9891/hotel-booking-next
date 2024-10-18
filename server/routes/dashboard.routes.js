import express from "express";
let router = express.Router();

import { getDashboard } from "../controllers/dashboard.controller";

router.get("/", getDashboard);

export default router;
