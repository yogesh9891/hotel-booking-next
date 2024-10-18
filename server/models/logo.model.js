import mongoose from "mongoose";

let logo = mongoose.Schema({
    logoUrl: String

}, { timestamps: true });

export default mongoose.model("logo", logo);