import user from "../models/user.model";
import adminCommission from "../models/adminCommission.model";

export const addcommission = async(req, res, next) => {
    try {
        let findSeller = await user.findById(req.body.sellerId).exec();
        if (!findSeller) throw { status: 400, message: "seller not found " };

        let sellerExist = await adminCommission.findOne({ sellerId: req.body.sellerId }).exec()
        if (sellerExist) throw { status: 400, message: "Commission already created, Kindly update commission details" };
        if (req.body.valueType == "percentage") {
            if (req.body.value >= 100) throw { status: 400, message: "Value cannot be or more than 100 %" };
        };
        let obj = {
            sellerId: req.body.sellerId,
            valueType: req.body.valueType,
            value: req.body.value
        };
        await adminCommission(obj).save();
        res.status(201).json({ message: "Commision Registered", success: true });
    } catch (err) {
        next(err);
    }
};

export const getCommission = async(req, res, next) => {
    try {
        let commissionArr = await adminCommission.find({}).lean().exec();
        res.status(200).json({ message: "Commission", data: commissionArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async(req, res, next) => {
    try {
        let findSeller = await adminCommission.findById(req.params.id).exec();
        if (!findSeller) throw { status: 400, message: "Commission details not found " };
        if (req.body.valueType == "percentage") {
            if (req.body.value >= 100) throw { status: 400, message: "Value cannot be or more than 100 %" };
        };
        let obj = {
            sellerId: req.body.sellerId,
            valueType: req.body.valueType,
            value: req.body.value
        };
        await adminCommission.findByIdAndUpdate(req.params.id, obj).exec();
        res.status(200).json({ message: "commission Updated", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async(req, res, next) => {
    try {
        const obj = await adminCommission.findByIdAndDelete(req.params.id).exec();
        if (!obj) throw { status: 400, message: "commission details Not Found or already deleted " };
        res.status(200).json({ message: "Commission details Deleted successfully", success: true });
    } catch (err) {
        next(err);
    }
};