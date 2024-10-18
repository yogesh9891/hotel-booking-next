import { number } from "joi";
import mongoose from "mongoose";

let Hotel = mongoose.Schema(
  {
    name: String,
    rmsPropertyName: String,
    rmsPropertyId: String,
    rmsCategoryId: String,
    areaId: String,
    slug: String,
    description: String,
    location: String,
    hotelCollection: [
      {
        id: String,
        name: String,
      },
    ],
    tagline: String,
    mainImage: String,
    googleMap: String,
    price: Number,
    hotelType: String,
    calendarUrl: String,
    bedroom: String,
    bathroom: String,
    meal: String,
    guest: Number,
    maxAdult: String,
    maxChild: String,
    pointDescription: [
      {
        name: String,
      },
    ],
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
    spotlightArr: [{ imageUrl: String }],
    propertyReachingInstructions: String,
    roomsArr: [
      {
        name: String,
        price: Number,
        area: String,
        bed: String,
        view: String,
        image: String,
        imagesArr: [{ imageUrl: String }],
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
      },
    ],
    propertyRules: [
      {
        heading: String,
        // isCoupleFriendly: false,
        rulesArr: [
          {
            name: String,
          },
        ],
      },
    ],
    galleryArr: [
      {
        title: String,
        imagesArr: [
          {
            imageUrl: String,
          },
        ],
      },
    ],
    isFoodAndDiningIncluded: { type: Boolean, default: false },
    foodAndDiningArr: [
      {
        name: String,
      },
    ],
    isNightLifeIncluded: { type: Boolean, default: false },
    nightLifeArr: [
      {
        name: String,
      },
    ],
    propertyHighlightsArr: [
      {
        name: String,
      },
    ],
    isRoomAndAmenititesIncluded: { type: Boolean, default: false },
    roomAndAmenitiesServiceArr: [
      {
        name: String,
        no: String,
      },
    ],
    isLocationAndSurroundingsIncluded: { type: Boolean, default: false },
    locationAndSurroundingsArr: [
      {
        name: String,
      },
    ],
    roomAndAmenitiesArr: [
      {
        name: String,
      },
    ],
    isActivitiesAndNearbyAttractionsIncluded: { type: Boolean, default: false },
    ActivitiesAndNearbyAttractionsArr: [
      {
        name: String,
      },
    ],
    isFAQIncluded: { type: Boolean, default: false },
    isPropertyHighlightsIncluded: { type: Boolean, default: false },
    faqArr: [
      {
        question: String,
        answer: String,
      },
    ],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", Hotel);
