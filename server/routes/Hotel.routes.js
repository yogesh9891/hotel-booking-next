import express from "express";
import { addHotel, customCalendar, deleteById, getHotel, getHotelById, getHotelByIdAndRates, getHotelBySlug, getHotelType, getHotelWithRoom, saveHotelposition, searchHotelFromApiByDestination, searchHotelFromApiByHotelId, updateById, updateDocumentStatus, updateHotel } from "../controllers/Hotels.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();
// , authorizeJwt
router.post("/", addHotel);

router.get("/getHotels", getHotel); // for admin
// router.get("/getFAQ", authorizeJwt, getFAQForUser);
router.get("/getHotelBySlug/:id", getHotelBySlug); 
router.get("/getHotelById/:id", getHotelById); 

router.patch("/updateById/:id", authorizeJwt, updateById); // for admin

router.delete("/deleteById/:id", authorizeJwt, deleteById);

router.patch("/updateStatus/:id", authorizeJwt, updateDocumentStatus); // for admin

router.get("/updateHotel", authorizeJwt,updateHotel);
router.get("/calendar/:id", customCalendar);
router.get("/getHotelWithRoom", getHotelWithRoom);
router.get("/getHotelType", getHotelType);
router.post("/searchHotelFromApi", searchHotelFromApiByDestination);
router.post("/getHotelByIdAndRates", getHotelByIdAndRates);
router.post("/saveHotelposition", saveHotelposition);
router.get("/searchHotelFromApiByHotelId/:id", searchHotelFromApiByHotelId);

export default router;
