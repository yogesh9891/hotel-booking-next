import mongoose from "mongoose";

let packages = mongoose.Schema(
    {   
        name: String,
        caption: String,
        duration: String,
        categoryArr: [{ categoryId: String }], //
        time: String,
        price: String,
        isVisa:{ type: Boolean, default: false },
        description:String,
        mainImage: { type: String },
        bannerImage: { type: String },
        status: { type: String },

    },
    { timestamps: true }
);
export default mongoose.model("package", packages);