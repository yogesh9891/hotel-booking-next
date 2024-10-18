import mongoose from "mongoose";

let Country = mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    description: String,
    countryCode: String,
    countryRezId: String,
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Country", Country);
