import mongoose from "mongoose";
import { rolesObj } from "../helpers/Constants";

let User = mongoose.Schema(
    {
        email: { type: String },
        phone: { type: String },
        name: { type: String },
        gender: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        password: { type: String },
        role: {
            type: String,
            default: rolesObj.USER,
        },
        permission: {
            type: mongoose.Types.ObjectId,
        },
        isDeleted: { type: Boolean, default: false },
        isApproved: { type: Boolean, default: false }, // for admin
        isActive: { type: Boolean, default: true },
        // isNotificationEnabled: {
        //     type: Boolean,
        //     default: true,
        // },
        // isNewsletterEnabled: {
        //     type: Boolean,
        //     default: true,
        // },
    },
    { timestamps: true }
);

export default mongoose.model("User", User);
