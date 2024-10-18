import sellerNotification from "../models/sellerNotification.model";
// import usersModel from "../models/user.model";

export const createNotification = async(req, res, next) => {
    try {
        let obj = {
            date: req.body.date,
            message: req.body.message,
            sellerId: req.body.sellerId
        };
        await new sellerNotification(obj).save();
        res.status(200).json({ message: "notification Created", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const getNotfication = async(req, res, next) => {
    try {
        let Arr = await sellerNotification.find().lean().exec();
        // console.log(UsersArr);
        res.status(200).json({ message: "notification", data: Arr, success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const updateNotification = async(req, res, next) => {
    try {
        let notificationObj = await sellerNotification.findById(req.params.id).exec();
        if (!notificationObj) throw new Error("seller not exist");
        let obj = {
            date: req.body.date || notificationObj.date,
            sellerId: req.body.sellerId || notificationObj.sellerId,
            message: req.body.message || notificationObj.message
        };
        await sellerNotification.findByIdAndUpdate(req.params.id, obj, { new: true }).exec();
        res.status(200).json({ message: "update successfully", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const deleteNotification = async(req, res, next) => {
    try {
        let obj = await sellerNotification.findByIdAndRemove(req.params.id).exec();
        if (!obj) throw new Error("notification not found or deleted already");
        res.status(200).json({ message: "delete successfully", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};