import userNotification from "../models/userNotification.model";

export const createNotification = async(req, res, next) => {
    try {
        let obj = {
            date: req.body.date,
            message: req.body.message,
            userId: req.body.userId,
            productId: req.body.productId
        };
        await new userNotification(obj).save();
        res.status(200).json({ message: "notification Created", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const getNotfication = async(req, res, next) => {
    try {
        let Arr = await userNotification.find().lean().exec();
        // console.log(UsersArr);
        res.status(200).json({ message: "notification", data: Arr, success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const updateNotification = async(req, res, next) => {
    try {
        let notificationObj = await userNotification.findById(req.params.id).exec();
        let obj = {
            date: req.body.title || notificationObj.date,
            userId: req.body.userId || notificationObj.userId,
            message: req.body.message || notificationObj.message,
            productId: req.body.productId || notificationObj.productId
        };
        await userNotification.findByIdAndUpdate(req.params.id, obj, { new: true }).exec();
        res.status(200).json({ message: "update successfully", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const deleteNotification = async(req, res, next) => {
    try {
        let obj = await userNotification.findByIdAndRemove(req.params.id).exec();
        if (!obj) throw new Error("notification not found or deleted already");
        res.status(200).json({ message: "delete successfully", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};