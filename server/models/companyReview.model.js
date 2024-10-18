import mongoose from "mongoose";
import { generalModelStatuses } from "../helpers/Constants";

let companyReview = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId },
    // Name: String,
    rating: { type: Number, },
    feedback: String,
    comapanyId: { type: mongoose.Types.ObjectId },
    status: { type: String, default: "pending", enum: ["approve", "denied", "pending"] },
    date: { type: Date, default: Date.now() },
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("companyReview", companyReview);