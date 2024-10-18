import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import productReview from "../models/productReview.model";
import companyReview from "../models/companyReview.model";
import Users from "../models/user.model";
import reviewSetting from "../models/reviewSetting.model";

import { isValid } from "../helpers/Validators";

export const addReview = async (req, res, next) => { //for user
    try {
        // console.log(req.body);
        let userfound = await Users.findOne({ _id: req.body.userId, role: "USER" });
        if (!userfound) throw new Error('you are not register');

        let userFound = await companyReview.find({ $and: [{ userId: req.body.userId, comapanyId: req.body.companyId }] }).lean().exec();
        if (userFound.length > 0) throw new Error('you already give review');

        if (!req.body.rating) throw new Error("rating is mandatory");
        if (!isValid(req.body.rating)) throw new Error('rating cant be empty');

        if (!req.body.feedback) throw new Error("feedback is mandatory");
        let statusFound = await reviewSetting.findOne().exec();
        let obj = {};

        if (statusFound.autoApproveCompanyReview == true) {
            obj = {
                name: req.body.name,
                feedback: req.body.feedback,
                rating: req.body.rating,
                userId: req.body.userId,
                companyId: req.body.companyId,
                isApproved: true,
                status: "approve"
            };
        } else {
            obj = {
                name: req.body.name,
                feedback: req.body.feedback,
                rating: req.body.rating,
                userId: req.body.userId,
                companyId: req.body.companyId
            };
        }
        let newReview = await new companyReview(obj).save();
        if (!newReview) throw new Error("Unable to create review");
        res.status(200).json({ message: "review Successfully Created ", success: true });
    } catch (err) {
        next(err);
    }
};

export const getReview = async (req, res, next) => { //for admin
    try {
        console.log(req.user, "req.user")
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
            { _id: req.user.userId, role: "SUBADMIN" }
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to check review");
        let reviewArr = await companyReview.find().lean().exec();
        res.status(200).json({ message: "getReview", data: reviewArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async (req, res, next) => { //for user 
    try {
        let userFound = await companyReview.findOne({ _id: req.params.id, isDeleted: false }).lean().exec();
        console.log(userFound, "userFound")
        if (!userFound) throw new Error('review not found or deleted ');
        // console.log(userFound, "ppppp");
        if (!(req.user.userId == userFound.userId)) throw new Error('you cannot edit someone else review');
        let obj = {
            rating: req.body.rating || userFound.rating,
            feedback: req.body.feedback || userFound.feedback,
            userId: userFound.userId,
            companyId: userFound.companyId,
        };
        await companyReview.findByIdAndUpdate(req.params.id, obj).exec();
        res.status(200).json({ message: "review Updated", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => { //for admin ,subadmin 
    try {

        if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete review");

        let obj = await companyReview.findOne({ _id: req.params.id, isDeleted: false }).exec();
        if (!obj) throw new Error('company review not found or deleted already');

        await companyReview.findByIdAndUpdate(req.params.id, { $set: { isDeleted: true } }).exec();
        res.status(200).json({ msg: "companyReview deleted successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const updateByIdForAdmin = async (req, res, next) => { //for admin 
    try {
        if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to update review");

        let Found = await companyReview.findById(req.params.id).lean().exec();
        if (!Found) throw new Error('review not found or deleted ');

        let obj = {
            rating: req.body.rating || Found.rating,
            feedback: req.body.feedback || Found.feedback,
            userId: req.body.userId || Found.userId,
            companyId: Found.companyId,
            isDeleted: req.body.isDeleted || Found.isDeleted,
            isApproved: req.body.isApproved || Found.isApproved,
            status: req.body.status || Found.status,
        };
        await companyReview.findByIdAndUpdate(req.params.id, obj).exec();
        res.status(200).json({ message: "review Updated", success: true });
    } catch (err) {
        next(err);
    }
};