import mongoose from "mongoose";

let userNotification = mongoose.Schema({
    date: String,
    userId: String,
    message: String,
    productId: String

}, { timestamps: true });

export default mongoose.model("userNotification", userNotification);