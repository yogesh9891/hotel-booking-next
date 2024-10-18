import mongoose from "mongoose";

let City = mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    description: String,
    countryId: String,
    cityRezId: String,
    cityCode: String,
    countryCode: String,
    stateId: String,
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("City", City);
