import mongoose from "mongoose";

let Collection = mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    description: String,
    slug: String,
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Collection", Collection);
