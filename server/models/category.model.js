import mongoose from "mongoose";
import { generalModelStatuses } from "../helpers/Constants";

let category = mongoose.Schema({
    name: String,
    slug: String,
    icon: String,
    searchable: { type: Boolean, default: false },
    status: { type: String, default: generalModelStatuses.APPROVED },
    categoryImage: String,
    parentCategoryId: String, //direct parent id
    parentCategoryArr: [{
        parentId: String,
    }],
    price: Number,
    order: {
        type: Number
    },
    level: {
        type: Number,
        default: 1,
    },
    isDeleted: { type: Boolean, default: false },
    specialEdition: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("category", category);