import mongoose from "mongoose";

let Location = mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    slug: String,
    description: String,
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Location", Location);
