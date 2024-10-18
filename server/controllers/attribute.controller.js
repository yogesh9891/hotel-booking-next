import Attribute from "../models/attribute.model";
import AttributeValue from "../models/attibuteValue.model";
import XLSX from "xlsx";
import { unlink } from "node:fs/promises";

export const addAttribute = async (req, res, next) => {
    try {
        let attributeCheck = await Attribute.findOne({ name: new RegExp(`^${req.body.name}$`) }).exec();
        if (attributeCheck) throw new Error({ status: 400, message: "Already Exists" });
        await Attribute(req.body).save();

        res.status(201).json({ message: "attribute Registered", success: true });
    } catch (err) {
        next(err);
    }
};
export const getAttribute = async (req, res, next) => {
    try {
        let attributeArr = await Attribute.find().populate("attributeValueArr.attributeId").lean().exec();
        attributeArr = attributeArr.map((el) => {
            return {
                ...el,
                label: el.name,
                value: el._id,
                attributeValueArr: el.attributeValueArr
                    .filter((el) => el.attributeId)
                    .map((elx) => ({ ...elx, attributeId: elx.attributeId._id, name: elx.attributeId.name, attributeObj: elx.attributeId, label: elx.attributeId.name, value: elx.attributeId._id, checked: false })),
            };
        });
        console.log(JSON.stringify(attributeArr, null, 2));
        res.status(200).json({ message: "getAttritube", data: attributeArr, success: true });
    } catch (err) {
        next(err);
    }
};
export const updateById = async (req, res, next) => {
    try {
        if (await Attribute.findOne({ name: req.body.name }).exec()) throw { status: 400, message: " attribute exist " };
        const attributeObj = await Attribute.findByIdAndUpdate(req.params.id, req.body).exec();
        if (!attributeObj) throw { status: 400, message: "attribute  Not Found" };
        res.status(200).json({ message: "attribute Updated", success: true });
    } catch (err) {
        next(err);
    }
};
export const deleteById = async (req, res, next) => {
    try {
        const attributeObj = await Attribute.findByIdAndDelete(req.params.id).exec();
        if (!attributeObj) throw { status: 400, message: "attribute Not Found" };
        res.status(200).json({ message: "attribute Deleted", success: true });
    } catch (err) {
        next(err);
    }
};

export const addAttributValue = async (req, res, next) => {
    try {
        console.log(req.body);
        let existCheck = await AttributeValue.findOne({ name: new RegExp(`^${req.body.name}$`) })
            .lean()
            .exec();
        if (existCheck) throw new Error("Attribute Value Already Exists");
        await AttributeValue(req.body).save();
        res.status(201).json({ message: "attributeValue Registered", success: true });
    } catch (err) {
        next(err);
    }
};

export const getAttributeValue = async (req, res, next) => {
    try {
        const getAttritubeValue = await AttributeValue.find().exec();
        res.status(200).json({ message: "getAttritubeValue", data: getAttritubeValue, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateAttributeValueById = async (req, res, next) => {
    try {
        // console.log(req.body, req.params);
        let attributeObj = await AttributeValue.findByIdAndUpdate(req.params.id, req.body).exec();
        if (!attributeObj) throw new Error({ status: 400, message: "attribute  Not Found" });
        res.status(200).json({ message: "attribute Updated", success: true });
    } catch (err) {
        next(err);
    }
};
export const deleteAttributeValueById = async (req, res, next) => {
    try {
        const attributeObj = await AttributeValue.findByIdAndDelete(req.params.id).exec();
        if (!attributeObj) throw { status: 400, message: "attribute Not Found" };
        res.status(200).json({ message: "attribute Deleted", success: true });
    } catch (err) {
        next(err);
    }
};

// import XLSX from "xlsx";

export const bulkUpload = async (req, res, next) => {
    try {
        // console.log(req.file, "req.file")
        let workbook = XLSX.readFile(req.file.path);
        // console.log(workbook, "req.filewwwwww")
        let sheet_nameList = workbook.SheetNames;
        // console.log(sheet_nameList[0], "sheet_nameList")
        let x = 0;

        let xlData = [];
        sheet_nameList.forEach((element) => {
            xlData.push(...XLSX.utils.sheet_to_json(workbook.Sheets[sheet_nameList[x]]));
            x++;
        });
        // console.log(xlData, "xlDataxlDataxlData") //done
        let attributeUnique = [];
        let attributeUniqueName = [];
        let attributeExist = [];
        for (let el = 0; el < xlData.length; el++) {
            // console.log(xlData[el].attributeName, "xlData[el].attrl].attributeName.")
            let attributeName = xlData[el].attributeName.split(",");
            let arr = [];
            for (let i = 0; i < attributeName.length; i++) {
                // console.log(attributeName[i], "namenamena99999me")
                let findId = await AttributeValue.findOne({ name: attributeName[i] });
                // console.log(findId, "findIdfindId")
                if (findId) {
                    arr.push({ attributeId: findId._id });
                } else {
                    let obj = {
                        name: attributeName[i],
                    };
                    let createAttribute = await AttributeValue(obj).save();
                    arr.push({ attributeId: createAttribute._id });
                }
            }
            let findNameExist = await Attribute.findOne({ name: xlData[el].name }).exec();
            // console.log(findNameExist, "findNameExistfindNameExist")
            if (findNameExist) {
                attributeExist.push(xlData[el].name);
            } else {
                attributeUniqueName.push(xlData[el].name);
                attributeUnique.push({
                    name: xlData[el].name,
                    description: xlData[el].description,
                    attributeValueArr: arr,
                });
            }
            // attributeValueArr.push(arr);
        }
        console.log(attributeExist, "attributeExistattributeExist");

        Attribute.insertMany(attributeUnique, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(data, "data345235")
            }
        });
        try {
            let ab = await unlink(req.file.path);
            console.log("successfully deleted req.file.path", ab);
        } catch (error) {
            console.error("there was an error:", error.message);
        }

        if (attributeExist.length > 0 && attributeUniqueName.length > 0) {
            throw {
                status: 400,
                message: ` ${attributeExist} attribute already exist & ${attributeUniqueName} successfully upload `,
            };
        } else if (attributeExist.length > 0) {
            throw { status: 400, message: ` ${attributeExist} attribute already exist` };
        } else if (attributeUniqueName.length > 0) {
            res.status(200).json({
                message: `${attributeUniqueName} successfully upload `,
                success: true,
            });
        } else {
            throw { status: 400, message: `provide some data` };
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};
