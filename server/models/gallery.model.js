import mongoose from "mongoose";

let gallery = mongoose.Schema(
  {
    name: String,
    description: String,
    imageUrl: String,
    galleryType: String,
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("gallery", gallery);
