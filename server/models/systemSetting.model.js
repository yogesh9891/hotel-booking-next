import mongoose from "mongoose";

let systemSetting = mongoose.Schema(
  {
    companyName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    VatNumber: { type: String },
    facebookLink: String,
    instagramLink: String,
    linkedinLink: String,
    twitterLink: String,
    address: String,
    companyInformation: String,
    facebookCode: String,
    googleCode: String,
    isActive: { type: Boolean, default: true },
    // isApproved: { type: Boolean, default: true },
    // isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("systemSetting", systemSetting);