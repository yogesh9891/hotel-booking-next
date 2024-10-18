import mongoose from "mongoose";
import { generalModelStatuses } from "../helpers/Constants";

let contactInfo = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    title: String,
    message: String,
    alternatePhone: String,
    facebookLink: String,
    twitterLink: String,
    instagramLink: String,
    propertyName:String,
    bookingDate:String,
    bookingPrice:String,
    bookingGuest:String,
    isBook: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("contactInfo", contactInfo);