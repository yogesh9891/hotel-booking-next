import mongoose from "mongoose";
import { discountStatus } from "../helpers/Constants";

let coupon = mongoose.Schema(
  {
    type: { type: String, default: discountStatus.PERCENTAGE },
    description: String,
    expiryDate: { type: Date },
    value: Number,
    isActive: { type: Boolean, default: true },
    discountCode: { type: String },
    usedBy: {
      type: Number,
      default: 0,
    },
    validFor: Number,
    image: String,
    minimumCartValue: Number,
    maxDiscount: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("coupon", coupon);
