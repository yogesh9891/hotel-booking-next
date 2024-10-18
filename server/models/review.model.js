import mongoose from "mongoose";
import { generalModelStatuses } from "../helpers/Constants";

let ReviewSchema = mongoose.Schema(
  {
    rating: { type: Number },
    message: String,
    title: String,
    link: String,
    date: Date,
    image: String,
    hotelId: String,
    status: { type: String, default: generalModelStatuses.PENDING }, // default: "pending", enum: ["approve", "denied", "pending"] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("review", ReviewSchema);
