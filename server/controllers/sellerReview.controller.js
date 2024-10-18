import sellerReview from "../models/sellerReview.model";
import Users from "../models/user.model";
import reviewSetting from "../models/reviewSetting.model";

import { isValid, validNo } from "../helpers/Validators";
import { generalModelStatuses } from "../helpers/Constants";

export const addReview = async (req, res, next) => { //for user
    try {
        console.log(req.body);
        // let userfound = await Users.findOne({ _id: req.user.userId }).exec();
        // if (!userfound) throw new Error('you are not register');
        console.log(req.body.userId)
        let statusFound = await reviewSetting.findOne({ userId: `${req.body.userId}` }).exec();

        console.log(statusFound, "statusFound")
        let userFound = await sellerReview.findOne({ userId: req.body.userId, productId: req.body.productId }).lean().exec();

        if (userFound) throw new Error('you already give review for this product');

        if (!req.body.rating) throw new Error("rating is mandatory");
        if (!isValid(req.body.rating)) throw new Error('rating cant be empty');

        if (!req.body.message) throw new Error("message is mandatory");
        if (req.body.rating) {
            if (req.body.rating > 5 || req.body.rating < 0) {
                throw new Error(' review cant be more than 5 or negative');
            }
        };

        let obj = {};
        if (statusFound && statusFound.autoApproveCompanyReview == true) {
            obj = {
                message: req.body.message,
                rating: req.body.rating,
                userId: req.body.userId,
                sellerId: req.body.sellerId,
                productId: req.body.productId,
                status: generalModelStatuses.APPROVED
            };
        } else {
            obj = {
                message: req.body.message,
                rating: req.body.rating,
                userId: req.body.userId,
                sellerId: req.body.sellerId,
                productId: req.body.productId
            };
        }
        let newReview = await new sellerReview(obj).save();
        if (!newReview) throw new Error("Unable to create review");
        res.status(200).json({ message: "review Successfully Created", success: true });
    } catch (err) {
        next(err);
    }
};

export const getReview = async (req, res, next) => { //for admin
    try {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
            { _id: req.user.userId, role: "SUBADMIN" },
            { _id: req.user.userId, role: "SELLER" },
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to check review");


        let reviewArr = await sellerReview.find({ sellerId: req.user.userId }).lean().exec();
        console.log(reviewArr, "reviewArr")
        for (const el of reviewArr) {
            if (el.userId) {
                let userObj = await Users.findById(el.userId).exec()
                el.userObj = userObj
            }
            if (el.sellerId) {
                let userObj = await Users.findById(el.sellerId).exec()
                el.sellerObj = userObj
            }
        }
        res.status(200).json({ message: "getReview", data: reviewArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const getReviewForUser = async (req, res, next) => { //for user
    try {
        let reviewArr = await sellerReview.find({ isDeleted: false }).lean().exec();
        res.status(200).json({ message: "getReview", data: reviewArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async (req, res, next) => { //for user 
    try {
        let userFound = await sellerReview
            .findOne({ sellerId: req.body.sellerId, userId: req.user.userId }).lean().exec();
        // console.log(userFound, "ppppp");
        if (!(req.user.userId == userFound.userId)) throw new Error('you cannot edit someone else review');

        if (req.body.rating) {
            if (req.body.rating > 10 || req.body.rating < 1) {
                throw new Error(' review cant be more than 10 or negative');
            }
        };

        let obj = {
            rating: req.body.rating || userFound.rating,
            feedback: req.body.feedback || userFound.feedback,
            userId: req.user.userId,
            sellerId: userFound.sellerId,
        };

        await sellerReview.findByIdAndUpdate(req.params.id, obj).exec();
        res.status(200).json({ message: "review Updated", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => { //for admin ,subadmin 
    try {
        // let adminCheck = await Users.findOne({
        //     $or: [
        //         { _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" }
        //     ]
        // }).exec();
        if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete review");

        let findObj = await sellerReview.findOne({ _id: req.params.id, isDeleted: false }).exec();
        console.log(findObj, "findObj")
        if (!findObj) throw new Error('product not found or deleted already');

        await sellerReview.findByIdAndUpdate(req.params.id, { $set: { isDeleted: true } }).exec();
        res.status(200).json({ msg: "review deleted successfully", success: true });

    } catch (err) {
        next(err);
    }
};

export const updateReview = async (req, res, next) => { //for admin,subadmin
    try {
        // let adminCheck = await Users.findOne({
        //     $or: [
        //         { _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" }
        //         // { _id: req.user.userId, role: "SELLER" },
        //     ]
        // }).exec();
        if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to update review");

        let userFound = await sellerReview
            .findOne({ _id: req.params.id, isDeleted: false }).lean().exec();
        if (!userFound) throw new Error('review not found or deleted');

        await sellerReview.findByIdAndUpdate(req.params.id, { $set: { isApproved: req.body.isApproved } }).exec();
        res.status(200).json({ message: "review Updated", success: true });
    } catch (err) {
        next(err);
    }
};