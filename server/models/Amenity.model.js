import mongoose from "mongoose";

let amenity = mongoose.Schema({
    name: String,
    image: String,
    amenityCategoryId: String,
}, { timestamps: true });

export default mongoose.model("amenity", amenity);