import mongoose from "mongoose";


let amenityCategory = mongoose.Schema({
    name: String,
}, { timestamps: true });

export default mongoose.model("amenityCategory", amenityCategory);