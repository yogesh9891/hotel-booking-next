import systemSetting from "../models/systemSetting.model";
import Users from "../models/user.model";
import logo from "../models/logo.model";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";

export const addLogo = async (req, res, next) => {
    try {
        let imageExistsCheck = await logo.findOne().exec()
        req.body.image = await storeFileAndReturnNameBase64(req.body.image);
        let obj = {
            logoUrl: req.body.image
        };
        console.log(imageExistsCheck)
        if (imageExistsCheck) {
            await logo.findByIdAndUpdate(imageExistsCheck._id, obj).exec()
        }
        else {
            await new logo(obj).save();
        }


        res.status(201).json({ message: "add logo successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const get = async (req, res, next) => {
    try {
        const get = await logo.find().exec();
        res.status(200).json({ message: " logo ", data: get, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async (req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
            { _id: req.user.userId, role: "SUBADMIN" }
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to update logo");

        req.body.logoUrl = await storeFileAndReturnNameBase64(req.body.logoUrl);
        let obj = {
            logoUrl: req.body.logoUrl
        };
        await logo.findByIdAndUpdate(req.params.id, obj).exec();
        res.status(201).json({ message: "update logo successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
            { _id: req.user.userId, role: "SUBADMIN" }
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to delete policy");

        let obj = await logo.findByIdAndRemove(req.params.id).exec();
        // console.log(obj, 'pppppp');
        if (!obj) throw { status: 400, message: "logo not found or deleted already" };

        res.status(200).json({ msg: " logo deleted successfully", success: true });
    } catch (err) {
        next(err);
    }
};