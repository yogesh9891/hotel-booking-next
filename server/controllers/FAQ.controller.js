import systemSetting from "../models/systemSetting.model";
import Users from "../models/user.model";
import FAQ from "../models/Faq.model";

export const addFAQ = async (req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [
        //         { _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" },
        //     ]
        // }).exec();

        // if (!validityCheck) throw new Error("you are not authorise to add FAQ");

        let obj = {
            question: req.body.heading,
            answer: req.body.description,
            type:req.body.type
        };
        await FAQ(obj).save();
        res.status(201).json({ message: "add FAQ  successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const getFAQ = async (req, res, next) => { //admin SUBADMIN
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [
        //         { _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" }
        //     ]
        // }).exec();
        // if (!validityCheck) throw new Error("you are not authorise to view FAQ");
        let query ={}
        if(req.query.type){
            query.type = req.query.type;
        }
        console.log(query,"queryquery")
        const get = await FAQ.find(query).exec();
        res.status(200).json({ message: " FAQ ", data: get, success: true });
    } catch (err) {
        next(err);
    }
};

export const getFAQForUser = async (req, res, next) => { // for user
    try {
        const get = await FAQ.find({ isDeleted: false }).exec();
        res.status(200).json({ message: "FAQ", data: get, success: true });
    } catch (err) {
        next(err);
    }
};

export const getById = async (req, res, next) => { // for user
    try {
        const get = await FAQ.findById( req.params.id).exec();
        res.status(200).json({ message: "FAQ", data: get, success: true });
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
        if (!validityCheck) throw new Error("you are not authorise to update FAQ");

        let { heading:question, description:answer ,type} = req.body;
        let obj = { question, answer,type };

        await FAQ.findByIdAndUpdate(req.params.id, obj).exec();
        res.status(201).json({ message: "update FAQ  successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [{ _id: req.user.userId, role: "ADMIN" },
        //     { _id: req.user.userId, role: "SUBADMIN" }
        //     ]
        // }).exec();
        // if (!validityCheck) throw new Error("you are not authorise to delete FAQ");

        let existsCheck = await FAQ.findById(req.params.id).exec();
        if (!existsCheck) {
          throw new Error("FAQ does not exist !");
        }
        await FAQ.findByIdAndDelete(existsCheck._id).exec();

        res.status(200).json({ msg: " FAQ deleted successfully", success: true });

    } catch (err) {
        next(err);
    }
}

export const updateDocumentStatus = async (req, res, next) => { //admin wants to update the 'isdeleted' false from true
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
            { _id: req.user.userId, role: "SUBADMIN" }
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to update the document status");

        let Obj = await FAQ.findByIdAndUpdate(req.params.id, { isDeleted: false }).exec();
        if (!Obj) throw { status: 400, message: "FAQ not found" };

        res.status(200).json({ msg: " FAQ status update successfully", success: true });
    } catch (err) {
        next(err);
    }
};