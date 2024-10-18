import mongoose from "mongoose";

let testimonials = mongoose.Schema(
  {
    name: String,
    comment: String,
    imageUrl: String,
    place: String,
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("testimonials", testimonials);
