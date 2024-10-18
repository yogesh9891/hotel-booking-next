import mongoose from "mongoose";
// import { generalModelStatuses } from "../helpers/Constants";

let policy = mongoose.Schema({
    policies: String

}, { timestamps: true });

export default mongoose.model("policy", policy);