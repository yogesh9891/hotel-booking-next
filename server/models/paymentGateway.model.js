import mongoose from "mongoose";
import { rolesObj, PERMISSION } from "../helpers/Constants";

let paymentGateway = mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    liveReady: Boolean,
    paymentType: String,
    secretkey: String,
    clientId: String,
    key: String,
    name: String,
    paymentUrl: String,
    GatewayLogo: String,
  },
  { timestamps: true }
);
export default mongoose.model("paymentGateway", paymentGateway);
