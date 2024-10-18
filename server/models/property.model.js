import mongoose from "mongoose";

let property = mongoose.Schema(
  {
    name: String,
    description: String,
    mainImage: String,
    price: Number,
    hotelType: String,
    address: String,
    propertyState: String,
    city: String,
    pincode: String,
    longitude: String,
    latitude: String,
    people: String,
    bathroom: String,
    extraPrice: String,
    meal: String,
    fname: String,
    lname: String,
    phone: String,
    email: String,
    fullAddress: String,
    paymentRecevied: String,
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
    roomsArr: [
      {
        name: String,
        size: String,
        image: String,
        description: String,
      },
    ],

    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("property", property);
