// import authorizeJwt from "../middlewares/auth.middleware";
import Category from "../models/category.model";
import systemSetting from "../models/systemSetting.model";
import Users from "../models/user.model";
// import Product from "../models/product.model";
import { ErrorMessages, rolesObj } from "../helpers/Constants";
import { ValidateEmail, validNo } from "../helpers/Validators";

export const addSystemSetting = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [
                { _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to add SystemSetting");

        let ExistCheck = await systemSetting.findOne({
            $or: [
                { email: new RegExp(`^${req.body.email}$`) },
                { phoneNumber: req.body.phoneNumber },
            ]
        }).exec();
        if (ExistCheck) throw new Error(`${ErrorMessages.EMAIL_EXISTS} or ${ErrorMessages.PHONE_EXISTS}  `);

        ExistCheck = await systemSetting.findOne({
            $or: [
                { companyName: new RegExp(`^${req.body.companyName}$`) },
                { VatNumber: req.body.VatNumber },
            ]
        }).exec();
        if (ExistCheck) throw new Error(`${ErrorMessages.COMPANY_EXISTS} or ${ErrorMessages.VAT_EXISTS}  `);

        console.log(req.body);

        if (!ValidateEmail(req.body.email)) throw new Error(ErrorMessages.INVALID_EMAIL);
        if (!validNo.test(req.body.phoneNumber)) throw new Error(ErrorMessages.INVALID_PHONE);

        let obj = {};
        obj.companyName = req.body.companyName,
            obj.email = req.body.email,
            obj.phoneNumber = req.body.phoneNumber,
            obj.VatNumber = req.body.VatNumber,
            obj.facebookLink = req.body.facebookLink,
            obj.instagramLink = req.body.instagramLink,
            obj.linkedinLink = req.body.linkedinLink,
            obj.twitterLink = req.body.twitterLink,
            obj.address = req.body.address,
            obj.companyInformation = req.body.companyInformation,
            obj.facebookCode = req.body.facebookCode,
            obj.googleCode = req.body.googleCode,

            await systemSetting(obj).save();

        res.status(201).json({ message: "add SystemSetting  successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const getSystemSetting = async(req, res, next) => { //admin SUBADMIN
    try {
        let validityCheck = await Users.findOne({
            $or: [
                { _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" }
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to view SystemSetting");
        const get = await systemSetting.find().exec();
        res.status(200).json({ message: "System-setting", data: get, success: true });
    } catch (err) {
        next(err);
    }
};
export const getSystemSettingForUser = async(req, res, next) => { // for user
    try {

        const get = await systemSetting.findOne().exec();
        res.status(200).json({ message: "System Setting", data: get, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async(req, res, next) => {
    try {
        let {
          companyName,
          email,
          phoneNumber,
          VatNumber,
          facebookLink,
          instagramLink,
          twitterLink,
          address,
          companyInformation,
          facebookCode,
          googleCode,
        } = req.body;
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" }
            ]
        }).exec();
        // if (!validityCheck) throw new Error("you are not authorise to update system setting");

        // let ExistCheck = await systemSetting.findOne({
        //     $or: [
        //         { email: new RegExp(`^${email}$`) },
        //         { phoneNumber: phoneNumber }
        //     ]
        // }).exec();
        // if (ExistCheck) throw new Error(`${ErrorMessages.EMAIL_EXISTS} or ${ErrorMessages.PHONE_EXISTS} `);

        // ExistCheck = await systemSetting.findOne({
        //     $or: [
        //         { companyName: new RegExp(`^${companyName}$`) },
        //         { VatNumber: VatNumber }
        //     ]
        // }).exec();
        // if (ExistCheck) throw new Error(`${ErrorMessages.COMPANY_EXISTS} or ${ErrorMessages.VAT_EXISTS}`);
        // // console.log(req.body);
        // if (email) {
        //     if (!ValidateEmail(email)) throw new Error(ErrorMessages.INVALID_EMAIL);
        // };
        // if (phoneNumber) {
        //     if (!validNo.test(phoneNumber)) throw new Error(ErrorMessages.INVALID_PHONE);
        // };
        let obj = {
            companyName, email, phoneNumber, VatNumber, facebookLink, instagramLink, twitterLink, address, companyInformation, facebookCode, googleCode
        }

        await systemSetting.findByIdAndUpdate(req.params.id, obj).exec();
        res.status(201).json({ message: "update SystemSetting  successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" }
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to delete system setting");

        let Obj = await systemSetting.findByIdAndRemove(req.params.id).exec();
        if (!Obj) throw { status: 400, message: "system setting not found or deleted already" };

        res.status(200).json({ msg: " SystemSetting deleted successfully", success: true });

    } catch (err) {
        next(err);
    }
}