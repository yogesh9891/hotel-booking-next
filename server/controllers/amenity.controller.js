import Amenity from "../models/Amenity.model";
import AmenityCategory from "../models/AmenityCategory.model";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";

export const addAmenity = async (req, res, next) => {
    try {
        let AmenityCheck = await Amenity.findOne({ name: new RegExp(`^${req.body.name}$`) }).exec();
        if (AmenityCheck) throw new Error("Already Exists");
        if (req.body.image) {
            req.body.image = await storeFileAndReturnNameBase64(req.body.image);
        };
        await Amenity(req.body).save();
        res.status(201).json({ message: "Amenity Registered", success: true });
    } catch (err) {
        next(err);
    }
};

export const getAmenity = async (req, res, next) => {
    try {
        let AmenityArr = await Amenity.find().lean().exec();
        for (const el of AmenityArr) {
            let amenityCategoryObj = await AmenityCategory.findById(el.amenityCategoryId).exec();
            el.amenityCategoryObj = amenityCategoryObj;
        }
        res.status(201).json({ message: "Amenity Found", data: AmenityArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateAmenity = async (req, res, next) => {
    try {
        let AmenityCheck = await Amenity.findById(req.params.id).exec();
        if (!AmenityCheck) throw new Error("Could not find amenity category");

        let AmenityCategoryCheck = await AmenityCategory.findById(req.body.amenityCategoryId).exec();
        if (!AmenityCategoryCheck) throw new Error("Could not find amenity category");


        if (req.body.image && `${req.body.image}`.includes("base64")) {
            req.body.image = await storeFileAndReturnNameBase64(req.body.image);
          }
        await Amenity.findByIdAndUpdate(AmenityCheck._id, req.body).exec();

        res.status(201).json({ message: "Amenity Updated", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteAmenity = async (req, res, next) => {
    try {
        let AmenityCheck = await Amenity.findById(req.params.id).exec();
        if (!AmenityCheck) throw new Error("Could not find amenity");

        await Amenity.findByIdAndDelete(AmenityCheck._id).exec();

        res.status(201).json({ message: "Amenity Updated", success: true });
    } catch (err) {
        next(err);
    }
};