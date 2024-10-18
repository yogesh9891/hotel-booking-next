import mongoose from "mongoose";
import { generalModelStatuses } from "../helpers/Constants";

let blog = mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
    author: String,
    blogCategoryId: { type: mongoose.Types.ObjectId },
    tagIdArr: [{ tagId: String }],
    image: { type: String },
    publish: { type: Boolean, default: true },
    read: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("blog", blog);
