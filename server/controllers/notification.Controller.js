import Users from "../models/user.model";
import notification from "../models/notification.model";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import userFcmTokensModel from "../models/userFcmTokens.model";
import { fcmMulticastNotify } from "../helpers/fcmNotify";
export const create = async (req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [{ _id: req.user.userId, role: "ADMIN" }],
        // }).exec();

        if (req.body.notificationImage) {
            req.body.image = await storeFileAndReturnNameBase64(req.body.notificationImage);
        } else {
            req.body.image = "";
        }

        // if (!validityCheck) throw new Error("You are not authorized to Send Notification");
        let usersArr = await Users.find({ isNotificationEnabled: true }).lean().exec();
        console.log(usersArr);
        let arr = [];
        for (let el of usersArr) {
            let fcmObj = await userFcmTokensModel
                .findOne({ userId: `${el._id}` })
                .lean()
                .exec();
            if (fcmObj?.token) {

                arr.push(fcmObj?.token);
            }
        }

        let notificationObj = {
            tokens: arr,
            data: {
                title: req.body.title,
                description: req.body.description,
            },
        };
        console.log(notificationObj)
        await fcmMulticastNotify(notificationObj);

        let tempNotificationArr = usersArr.map((el) => {
            let tempObj = {
                userId: el._id,
                // isGlobal: req.body.isGlobal,
                title: req.body.title,
                isRead: req.body.isRead,
                message: req.body.description,
                image: req.body.image,
            };
            return tempObj;
        });

        await notification.insertMany(tempNotificationArr);
        res.status(200).json({ message: "notification Create successfully", success: true });
    } catch (error) {
        console.error(JSON.stringify(error, null, 2));
        next(error);
    }
};

export const get = async (req, res, next) => {
    try {
        let Arr = await notification.find().lean().exec();
        res.status(200).json({ message: "notification", data: Arr, success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const updateById = async (req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" }],
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to update Notification");

        let notificationObj = await notification.findById(req.params.id).exec();
        if (!notificationObj) throw { message: "notification not found" };
        let obj = {
            userId: req.body.userId || notificationObj.userId,
            isGlobal: req.body.isGlobal || notificationObj.isGlobal,
            isRead: req.body.isRead || notificationObj.isRead,
            message: req.body.message || notificationObj.message,
        };
        await notification.findByIdAndUpdate(req.params.id, obj, { new: true }).exec();
        res.status(200).json({ message: "Update successfully", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const deleteById = async (req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" }],
        }).exec();
        if (!validityCheck) throw { message: "you are not authorise to delete Notification" };

        let obj = await notification.findByIdAndRemove(req.params.id).exec();
        if (!obj) throw new Error("notification not found or deleted already");
        res.status(200).json({ message: "Delete successfully", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
