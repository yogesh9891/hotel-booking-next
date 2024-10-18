import mongoose from "mongoose";

import { generalModelStatuses } from "../helpers/Constants";

let adminCommission = mongoose.Schema({
    sellerId: String,
    valueType: { type: String, enum: ['flatOff', "percentage"] },
    value: Number
}, { timestamps: true });

export default mongoose.model("adminCommission", adminCommission);