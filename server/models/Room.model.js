import mongoose from "mongoose";

let Room = mongoose.Schema(
  {
    name: String,
    slug: String,
    hotelId: String,
    mainImage: String,
    rmsPropertyName: String,
    rmsPropertyId: String,
    rmsCategoryId: String,
    areaId: String,
    price: Number,
    calendarUrl: String,
    noOfRoom: Number,
    bathroom: String,
    meal: String,
    maxGuest: Number,
    guest: Number,
    adultPrice: Number,
    childPrice: Number,
    amenitiesArr: [
      {
        amenityCategoryId: String,
        amenityCategoryName: String,
        amenityArr: [
          {
            amenityName: String,
            amenityImage: String,
            amenityId: String,
          },
        ],
      },
    ],
    imagesArr: [{ imageUrl: String }],
    opionsArr: [
      {
        name: String,
        price: Number,
        maxGuest: Number,
        adultPrice: Number,
        childPrice: Number,
      },
    ],
    pointDescription: [
      {
        name: String,
      },
    ],

    isActive: { type: Boolean, default: true },
    isPointDescription: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Room", Room);
