import mongoose from "mongoose";

let Seo = mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    description: String,
    title: String,
    keywords: String,
    url: String,
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Seo", Seo);
