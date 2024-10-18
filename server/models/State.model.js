import mongoose from "mongoose";

let State = mongoose.Schema({
    name: String,
    countryId: String,
    imageUrl: String,
    description: String,
    status: { type: String },
}, { timestamps: true });

export default mongoose.model("State", State);