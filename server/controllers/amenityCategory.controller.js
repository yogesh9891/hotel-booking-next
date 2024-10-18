import AmenityCategory from "../models/AmenityCategory.model";
import Amenity from "../models/Amenity.model";

export const addAmenityCategory = async (req, res, next) => {
    try {
        let AmenityCategoryCheck = await AmenityCategory.findOne({ name: new RegExp(`^${req.body.name}$`) }).exec();
        if (AmenityCategoryCheck) throw new Error("Already Exists");
        await AmenityCategory(req.body).save();

        res.status(201).json({ message: "Amenity Category Registered", success: true });
    } catch (err) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", JSON.stringify(err, null, 2), "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        next(err);
    }
};


export const getAmenityCategory = async (req, res, next) => {
    try {
        let AmenityCategoryArr = await AmenityCategory.find().lean().exec();
        for (const el of AmenityCategoryArr) {
            let amenityArr = await Amenity.find({ amenityCategoryId: `${el._id}` })
            el.amenityArr = amenityArr
        }
        res.status(201).json({ message: "Amenity Category Found", data: AmenityCategoryArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateAmenityCategory = async (req, res, next) => {
    try {
        let AmenityCategoryCheck = await AmenityCategory.findById(req.params.id).exec();
        if (!AmenityCategoryCheck) throw new Error("Could not find amenity category");

        await AmenityCategory.findByIdAndUpdate(AmenityCategoryCheck._id, req.body).exec();

        res.status(201).json({ message: "Amenity Category Updated", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteAmenityCategory = async (req, res, next) => {
    try {
        let AmenityCategoryCheck = await AmenityCategory.findById(req.params.id).exec();
        if (!AmenityCategoryCheck) throw new Error("Could not find amenity category");

        await AmenityCategory.findByIdAndDelete(AmenityCategoryCheck._id).exec();

        res.status(201).json({ message: "Amenity Category Updated", success: true });
    } catch (err) {
        next(err);
    }
};