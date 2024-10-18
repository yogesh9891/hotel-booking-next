import mongoose from "mongoose";
let UserFcmTokens = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
        },
        token: String,
    },
    { timestamps: true }
);
export default mongoose.model("UserFcmTokens", UserFcmTokens);
