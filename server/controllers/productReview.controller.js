import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import productReview from "../models/productReview.model";
import Product from "../models/product.model";
import Users from "../models/user.model";
import reviewSetting from "../models/reviewSetting.model";

import { isValid } from "../helpers/Validators";
import { generalModelStatuses } from "../helpers/Constants";

export const addReview = async (req, res, next) => { //for user
    try {
        console.log(req.body);
        // let userfound = await Users.findOne({ _id: req.user.userId }).exec();
        // if (!userfound) throw new Error('you are not register');
        console.log(req.body.userId)
        let statusFound = await reviewSetting.findOne({ userId: `${req.body.userId}` }).exec();

        console.log(statusFound, "statusFound")
        let userFound = await productReview.findOne({ userId: req.body.userId, productId: req.body.productId }).lean().exec();

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
        if (statusFound && statusFound.autoApproveProductReview == true) {
            obj = {
                message: req.body.message,
                rating: req.body.rating,
                userId: req.body.userId,
                productId: req.body.productId,
                status: generalModelStatuses.APPROVED
            };
        } else {
            obj = {
                message: req.body.message,
                rating: req.body.rating,
                userId: req.body.userId,
                productId: req.body.productId
            };
        }
        let newReview = await new productReview(obj).save();
        if (!newReview) throw new Error("Unable to create review");
        res.status(200).json({ message: "review Successfully Created", success: true });
    } catch (err) {
        next(err);
    }
};

export const getReview = async (req, res, next) => { //for admin
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
            { _id: req.user.userId, role: "SUBADMIN" },
            { _id: req.user.userId, role: "SELLER" },
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to check review");


        let productsArr = await Product.find({ createdBy: req.user.userId }).exec()
        let reviewArr = await productReview.find({ productId: { $in: [...productsArr.map(el => el._id)] } }).lean().exec();
        for (const el of reviewArr) {
            if (el.userId) {
                let userObj = await Users.findById(el.userId).exec()
                el.userObj = userObj
            }
        }
        res.status(200).json({ message: "getReview", data: reviewArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const getReviewForUser = async (req, res, next) => { //for user
    try {
        let reviewArr = await productReview.find({ isDeleted: false }).lean().exec();
        res.status(200).json({ message: "getReview", data: reviewArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async (req, res, next) => { //for user 
    try {
        let userFound = await productReview
            .findOne({ productId: req.body.productId, userId: req.user.userId }).lean().exec();
        console.log(userFound, "ppppp");
        if (!(req.user.userId == userFound.userId)) throw new Error('you cannot edit someone else review');
        if (req.body.rating) {
            if (req.body.rating > 10 || req.body.rating < 0) {
                throw new Error(' review cant be more than 10 or negative');
            }
        };
        let obj = {
            rating: req.body.rating || userFound.rating,
            message: req.body.message || userFound.message,
            userId: req.user.userId,
            productId: userFound.productId,
        };

        await productReview.findByIdAndUpdate(req.params.id, obj).exec();
        res.status(200).json({ message: "review Updated", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => { //for admin ,subadmin  ,seller
    try {

        if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete product review");

        let productObj = await productReview.findOne({ _id: req.params.id, isDeleted: false }).exec();
        console.log(productObj, "productObj")
        if (!productObj) throw new Error('product not found or deleted already');

        await productReview.findByIdAndUpdate(req.params.id, { $set: { isDeleted: true } }).exec();
        res.status(200).json({ msg: "product deleted successfully", success: true });

    } catch (err) {
        next(err);
    }
};

export const updateProductReview = async (req, res, next) => { //for admin,subadmin
    try {

        if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN" && req.user.role != "SELLER") throw new Error("you are not authorise to update product review");

        let userFound = await productReview
            .findOne({ _id: req.params.id, isDeleted: false }).lean().exec();
        if (!userFound) throw new Error('review not found or deleted');
        await productReview.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } }).exec();

        res.status(200).json({ message: "review Updated", success: true });
    } catch (err) {
        next(err);
    }
};