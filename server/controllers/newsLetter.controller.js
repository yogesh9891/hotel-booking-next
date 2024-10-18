import { sendMail } from "../helpers/nodemailer";
import newsLetter from "../models/newsLetter.model";
import Users from "../models/user.model";
export const create = async (req, res, next) => {
    try {
        // const findSubscription = await newsLetter.findOne({ name: req.body.name }).lean().exec();
        // if (findSubscription) throw { status: 400, message: `already exist newsLetter with this name ${req.body.name}` };

        // if (!["monthly", "quarterly", "yearly"].includes(req.body.type)) throw { status: 400, message: "not valid type" };

        let obj = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
        };
        // let usersArr = await Users.find().lean().exec();
        let usersArr = await Users.find({ isNewsletterEnabled: true }).lean().exec();

        await sendMail(
            usersArr.map((el) => el.email),
            obj.title,
            obj.description
        );
        await newsLetter(obj).save();
        res.status(201).json({ message: "newsLetter create successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const get = async (req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [{ _id: req.user.userId, role: "ADMIN" }],
        // }).exec();
        // if (!validityCheck) throw new Error("you are not authorise to update Notification");

        const get = await newsLetter.find().exec();
        res.status(200).json({ message: "newsLetter", data: get, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async (req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" }],
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to update Notification");

        if (req.body.name) {
            let findNewsLetter = await newsLetter.findOne({ name: req.body.name }).exec();
            if (findNewsLetter) throw { status: 400, message: `newsLetter exist with this name ${req.body.name}` };
        }
        if (!["monthly", "quarterly", "yearly"].includes(req.body.type)) throw { status: 400, message: "not valid type" };
        let obj = {
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
        };

        const findObj = await newsLetter.findByIdAndUpdate(req.params.id, obj, { new: true }).exec();
        if (!findObj) throw { status: 400, message: "newsLetter  Not Found" };
        res.status(200).json({ message: "newsLetter Update successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" }],
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to update Notification");

        const findObj = await newsLetter.findByIdAndDelete(req.params.id).exec();
        if (!findObj) throw { status: 400, message: "newsLetter Not Found or deleted already" };
        res.status(200).json({ message: "newsLetter Delete successfully", success: true });
    } catch (err) {
        next(err);
    }
};
