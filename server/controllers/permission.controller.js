import Users from "../models/user.model";
import permission from "../models/permission.model";

// userId: mongoose.Types.ObjectId,
// permissionsArr: [{
//     permissionName: String,
//     permissionsObj: {
//         CREATE: { type: Boolean, default: false },
//         READ: { type: Boolean, default: false },
//         DELETE: { type: Boolean, default: false },
//         UPDATE: { type: Boolean, default: false },
//     },
// }]
export const create = async(req, res, next) => {
    try {
        // console.log(req.body)
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" }]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to give permission");
        let userFound = await permission.findOne({ userId: req.body.userId }).exec()
        if (userFound) throw { message: "already give permission, kindly update permision for this user" }
        let obj = {
            userId: req.body.userId,
            permissionsArr: [{
                permissionName: req.body.permissionName,
                permissionsObj: req.body.permissionsObj
            }]
        };
        let create = await new permission(obj).save()
        await Users.findByIdAndUpdate(req.body.userId, { permission: create._id }).exec()
        res.status(200).json({ message: "permission alloted successfully ", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const get = async(req, res, next) => {
    try {
        let Arr = await permission.find().lean().exec();
        res.status(200).json({ message: "permission", data: Arr, success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const updateById = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" }]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to update permission");

        let objFound = await permission.findById(req.params.id).exec();
        if (!objFound) throw { message: "permission not found " };

        let obj = {
            userId: req.body.userId || objFound.userId,
            permissionsArr: [{
                permissionName: req.body.permissionName || objFound.permissionsArr[0].permissionName,
                permissionsObj: {
                    CREATE: req.body.permissionsObj.CREATE || objFound.permissionsArr[0].permissionsObj.CREATE,
                    READ: req.body.permissionsObj.READ || objFound.permissionsArr[0].permissionsObj.READ,
                    DELETE: req.body.permissionsObj.DELETE || objFound.permissionsArr[0].permissionsObj.DELETE,
                    UPDATE: req.body.permissionsObj.UPDATE || objFound.permissionsArr[0].permissionsObj.UPDATE,
                }
            }]
        };
        await permission.findByIdAndUpdate(req.params.id, obj, { new: true }).exec();
        res.status(200).json({ message: "Update successfully", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const deleteById = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" }]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to delete Notification");

        let obj = await permission.findByIdAndRemove(req.params.id).exec();
        if (!obj) throw new Error("permission not found or deleted already");
        res.status(200).json({ message: "Delete successfully", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};