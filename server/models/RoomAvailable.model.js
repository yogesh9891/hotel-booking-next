import mongoose from "mongoose";

let RoomAvailable = mongoose.Schema(
  {
    hotelId: String,
    roomId: String,
    name: String,
    price: Number,
    maxGuest: Number,
    adultPrice: Number,
    noOfRoom: Number,
    childPrice: Number,
    availableDate:Date,
    bookingDetails:{
      name:String,
      email:String,
      mobile:String,
      bookingId:String,
    },
    isAvailable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("RoomAvailable", RoomAvailable);
