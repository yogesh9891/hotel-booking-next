import tag from "../models/tag.model";
import Users from "../models/user.model";
import Product from "../models/product.model";
import XLSX from "xlsx";
import { unlink } from 'node:fs/promises';

export const createTag = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
                { _id: req.user.userId, role: "SELLER" },
            ]
        }).exec()
        if (!validityCheck) throw new Error("you are not authorise to add tags");

        let tagExist = await tag.findOne({ name: req.body.name }).exec();
        if (tagExist) throw new Error("tag exist");
        await tag(req.body).save();

        res.status(201).json({ message: "tag Registered", success: true });
    } catch (err) {
        next(err);
    }
};
export const getTag = async(req, res, next) => {
    try {

        const getTag = await tag.find().exec();
        res.status(200).json({ message: "tag", data: getTag, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to update tags");
        let tagFound = await tag.findOne({ name: req.body.name });

        if (tagFound) throw { status: 400, message: " this tag exist, update with unique name" };

        const tagObj = await tag.findByIdAndUpdate(req.params.id, req.body).exec();

        // if (!tagObj) throw { status: 400, message: "tag  Not Found" };
        res.status(200).json({ message: "tag Updated", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to delete tags");

        let tagObj = await tag.findOne({ _id: req.params.id, isDeleted: false }).exec();
        if (!tagObj) throw { status: 400, message: "tag not found or deleted already " };

        await tag.findByIdAndUpdate(req.params.id, { $set: { isDeleted: true } }).exec();
        res.status(200).json({ msg: "tag deleted successfully", success: true });

    } catch (err) {
        next(err);
    }
};

export const productSearchFromTagId = async(req, res, next) => {
    try {
        const productArr = await Product.find({ tagArr: { $elemMatch: { tagId: req.params.id } } }).exec()
        console.log(productArr, "productArr")

        res.status(200).json({ message: "products list", data: productArr, success: true });
    } catch (err) {
        next(err);
    }
};


// import XLSX from "xlsx";

export const bulkUpload = async(req, res, next) => {
    try {
        // console.log(req.file, "req.file")
        let workbook = XLSX.readFile(req.file.path);
        // console.log(workbook, "req.filewwwwww")
        let sheet_nameList = workbook.SheetNames;
        // console.log(sheet_nameList[0], "sheet_nameList")
        let x = 0;

        let xlData = [];
        sheet_nameList.forEach(element => {
            xlData.push(...XLSX.utils.sheet_to_json(workbook.Sheets[sheet_nameList[x]]));
            x++
        });
        // console.log(xlData, "xlDataxlDataxlData") //done        
        let tagUnique = [];
        let tagUniqueName = [];
        let tagExist = [];
        for (let el = 0; el < xlData.length; el++) {
            // console.log(xlData[el].attributeName, "xlData[el].attrl].attributeName.")
            let tagName = xlData[el].name.split(",");
            let arr = [];
            // for (let i = 0; i < tagName.length; i++) {
            //     // console.log(attributeName[i], "namenamena99999me")
            //     let findId = await tag.findOne({ name: tagName[i] });
            //     // console.log(findId, "findIdfindId")
            //     if (findId) {
            //         arr.push({ tagId: findId._id });
            //     } else {
            //         let obj = {
            //             name: attributeName[i]
            //         };
            //         let createTaG = await tag(obj).save();
            //         arr.push({ attributeId: createAttribute._id });
            //     }
            // }
            let findNameExist = await tag.findOne({ name: xlData[el].name }).exec()
                // console.log(findNameExist, "findNameExistfindNameExist")
            if (findNameExist) {
                tagExist.push(xlData[el].name);
            } else {
                tagUniqueName.push(xlData[el].name);
                tagUnique.push({
                    name: xlData[el].name,
                });
            }
        };
        console.log(tagExist, "tagExisttagExist");

        tag.insertMany(tagUnique, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(data, "data345235")
            }
        });
        try {
            let ab = await unlink(req.file.path);
            console.log('successfully deleted req.file.path', ab);
        } catch (error) {
            console.error('there was an error:', error.message);
        };
        if (tagExist.length > 0 && tagUniqueName.length > 0) {
            throw {
                status: 400,
                message: ` ${tagExist} tag already exist & ${tagUniqueName} tag successfully upload `
            };
        } else if (tagExist.length > 0) {
            throw { status: 400, message: ` ${tagExist} tag already exist` };

        } else if (tagUniqueName.length > 0) {
            res.status(200).json({
                message: `${tagUniqueName} successfully upload `,
                success: true
            });
        } else {
            throw { status: 400, message: `provide some data` }
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};