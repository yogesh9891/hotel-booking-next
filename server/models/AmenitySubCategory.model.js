import mongoose from "mongoose";


let amenitySubCategory = mongoose.Schema({
    name: String,
    amenityCategoryId: String
}, { timestamps: true });

export default mongoose.model("amenitySubCategory", amenitySubCategory);