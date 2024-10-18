import mongoose from "mongoose";
// import { generalModelStatuses } from "../helpers/Constants";

let propertyType = mongoose.Schema({
   clientId:String,
   propertyId:String,
   name:String,
   clientName:String,

}, { timestamps: true });

export default mongoose.model("propertyType", propertyType);