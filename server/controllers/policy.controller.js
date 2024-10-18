import systemSetting from "../models/systemSetting.model";
import Users from "../models/user.model";
import policy from "../models/policy.model";

export const addPolicy = async (req, res, next) => {
    try {
        let obj = {
            policies: req.body.policies
        };
        let existsCheck = await policy.findOne().exec()
        if (existsCheck) {
            await policy.findByIdAndUpdate(existsCheck._id, obj).exec();
        }
        // let validityCheck = await Users.findOne({
        //     $or: [
        //         { _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" },
        //     ]
        // }).exec();

        // if (!validityCheck) throw new Error("you are not authorise to add policy");
        else {
            await policy(obj).save();
        }
        res.status(201).json({ message: "add policy successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const get = async (req, res, next) => {
    try {
        const get = await policy.find().exec();
        res.status(200).json({ message: " policy ", data: get, success: true });
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
        if (!validityCheck) throw new Error("you are not authorise to update policy");

        let obj = { policies: req.body.policies };
        await policy.findByIdAndUpdate(req.params.id, obj).exec();

        res.status(201).json({ message: "update policy  successfully", success: true });
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

        let Obj = await policy.findOne({ _id: req.params.id, isDeleted: false }).exec();
        console.log(Obj, "obj")
        if (!Obj) throw { status: 400, message: "policy not found or deleted already" };

        await policy.findByIdAndUpdate(req.params.id, { isDeleted: true }).exec();

        res.status(200).json({ msg: " policy deleted successfully", success: true });

    } catch (err) {
        next(err);
    }
}