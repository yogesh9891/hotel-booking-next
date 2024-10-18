import express from "express";
import { AddRoomDatesPrice, getCalendar, getCalendarAvailables, getRoomById, getRoomsAvailables, updateRoomDates } from "../controllers/Room.controller";
import { addRoom, deleteById, getRoom, getRoomBySlug, updateById } from "../controllers/Room.controller";
import { authorizeJwt } from "../middlewares/auth.middleware";

let router = express.Router();
// , authorizeJwt
router.post("/", addRoom);

router.get("/getRooms", getRoom); // for admin
// router.get("/getFAQ", authorizeJwt, getFAQForUser);
router.get("/getRoomBySlug/:id", getRoomBySlug); 
router.get("/getRoomById/:id", getRoomById); 

router.patch("/updateById/:id", authorizeJwt, updateById); // for admin

router.delete("/deleteById/:id", authorizeJwt, deleteById);

router.get("/getRoomsAvailables", getRoomsAvailables); // for admin
router.get("/getCalendarAvailables", getCalendarAvailables); // for admin
router.post("/updateRoomDates",authorizeJwt, updateRoomDates);
router.post("/AddRoomDatesPrice",authorizeJwt, AddRoomDatesPrice);
router.get("/calendar", getCalendar);
router.get("/getCalendar", getCalendar);

export default router;
