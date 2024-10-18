import mongoose from "mongoose";
import { generalModelStatuses } from "../helpers/Constants";

let banner = mongoose.Schema(
    {
        name: String,
        image: { type: String },
        url: { type: String },
        description: String,
        status: { type: Boolean, default: false }
        // slide: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("banner", banner);
