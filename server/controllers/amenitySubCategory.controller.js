import AmenityCategory from "../models/AmenityCategory.model";
import AmenitySubCategory from "../models/AmenitySubCategory.model";

export const addAmenitySubCategory = async (req, res, next) => {
    try {
        let AmenitySubCategoryCheck = await AmenitySubCategory.findOne({ name: new RegExp(`^${req.body.name}$`) }).exec();
        if (AmenitySubCategoryCheck) throw new Error("Already Exists");
        await AmenitySubCategory(req.body).save();
        res.status(201).json({ message: "Amenity Sub Category Registered", success: true });
    } catch (err) {
        next(err);
    }
};

export const getAmenitySubCategory = async (req, res, next) => {
    try {
        let AmenityArr = await AmenitySubCategory.find().lean().exec();
        for (const el of AmenityArr) {
            let amenityCategoryObj = await AmenityCategory.findById(el.amenityCategoryId).exec();
            el.amenityCategoryObj = amenityCategoryObj;
        }
        res.status(201).json({ message: "Amenity Sub Category Found", data: AmenityArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateAmenitySubCategory = async (req, res, next) => {
    try {
        let AmenityCategoryCheck = await AmenityCategory.findById(req.params.id).exec();
        if (!AmenityCategoryCheck) throw new Error("Could not find amenity category");


        await AmenitySubCategory.findByIdAndUpdate(AmenitySubCategoryCheck._id, req.body).exec();

        res.status(201).json({ message: "Amenity Sub Category Updated", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteAmenitySubCategory = async (req, res, next) => {
    try {
        let AmenitySubCategoryCheck = await AmenitySubCategory.findById(req.params.id).exec();
        if (!AmenitySubCategoryCheck) throw new Error("Could not find amenity");

        await AmenitySubCategory.findByIdAndDelete(AmenitySubCategoryCheck._id).exec();

        res.status(201).json({ message: "Amenity Sub Category Updated", success: true });
    } catch (err) {
        next(err);
    }
};