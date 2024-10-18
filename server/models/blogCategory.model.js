import mongoose from "mongoose";
import { generalModelStatuses } from "../helpers/Constants";

let blogCategory = mongoose.Schema({
    name: String,
    image: { type: String },
    status: {
        type: String,
        default: generalModelStatuses.APPROVED,
    },
}, { timestamps: true });

export default mongoose.model("blogCategory", blogCategory);