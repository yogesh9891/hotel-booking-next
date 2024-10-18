import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import Category from "../models/category.model";
import Users from "../models/user.model";
// import bodyparser from "body-parser";
import XLSX from "xlsx";
// import multer from "multer";
// import express from "express";

export const addCategory = async (req, res, next) => {
    try {
        // console.log(req.body);
        // console.log(req.user, "req.user")
        // let adminCheck = await Users.findOne({
        //     $or: [{ _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" }
        //     ]
        // }).exec()
        // console.log(adminCheck, "admin")
        // if (!adminCheck) throw new Error("you are not authorise to create user");

        const CategoryNameCheck = await Category.findOne({
            $or: [{ name: new RegExp(`^${req.body.name}$`, "i") }, { slug: new RegExp(`^${req.body.slug}$`) }],
        }).exec();
        if (CategoryNameCheck) throw new Error("Entry Already exist please change name or url");
        let obj = {};
        if (req.body.imageStr) {
            req.body.categoryImage = await storeFileAndReturnNameBase64(req.body.imageStr);
        }
        if (req.body.parentCategoryId) {
            let categoryObj = await Category.findById(req.body.parentCategoryId).lean().exec();
            console.log(categoryObj, "objjj")
            let parentCategoryArr = [...categoryObj.parentCategoryArr];
            // console.log(parentCategoryArr, "pppp");
            parentCategoryArr.push({ parentId: categoryObj._id });
            obj = {
                ...req.body,
                order: categoryObj.order + 1,
                level: categoryObj.level + 1,
                parentCategoryArr,
                specialEdition: true,
            };
        } else {
            const categoryCount = await Category.countDocuments({ level: 1 }).exec();
            console.log(categoryCount, "tttttt");
            obj = { ...req.body, order: categoryCount + 1, level: 1 };
        }
        let newEntry = new Category(obj).save();
        if (!newEntry) throw new Error("Unable to create Category");
        res.status(200).json({ message: "Category Successfully Created", success: true });
    } catch (err) {
        next(err);
    }
};

export const getCategory = async (req, res, next) => {
    try {
        let categoryArr = [];
        if (req.query.level) {
            if (req.query.parentCategoryId) {
                console.log("pci")
                categoryArr = await Category.find({ level: req.query.level, parentCategoryId: req.query.parentCategoryId, isDeleted: false }).lean().exec();
            }
            else {
                console.log("lvl")
                categoryArr = await Category.find({ level: req.query.level, isDeleted: false }).lean().exec();
            }
        } else {
            categoryArr = await Category.find({ isDeleted: false }).lean().exec();
        }
        for (let el of categoryArr) {
            if (el.parentCategoryId) {
                let parentObj = await Category.findById(el.parentCategoryId).lean().exec();
                if (parentObj) {
                    el.parentCategoryName = parentObj.name;
                }
            }
        }
        console.log(categoryArr, "categoryArr");
        res.status(200).json({ message: "getCategory", data: categoryArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async (req, res, next) => {
    try {

        // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to update category");
        let obj = {};
        if (req.body.imageStr) {
            req.body.categoryImage = await storeFileAndReturnNameBase64(req.body.imageStr);
        }
        if (req.body.parentCategoryId) {
            let categoryObj = await Category.findById(req.body.parentCategoryId).lean().exec();
            let parentCategoryArr = [...categoryObj.parentCategoryArr];
            parentCategoryArr.push({ parentId: categoryObj._id });
            obj = {
                ...req.body,
                order: categoryObj.order + 1,
                level: categoryObj.level + 1,
                parentCategoryArr,
            };
        } else {
            const categoryCount = await Category.countDocuments({ level: 1 }).exec();
            obj = { ...req.body, order: categoryCount + 1, level: 1 };
        }
        await Category.findByIdAndUpdate(req.params.id, obj).exec();

        res.status(200).json({ message: "category Updated", success: true });
    } catch (err) {
        next(err);
    }
};
export const deleteById = async (req, res, next) => {
    try {
        // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to update user");

        const categoryObj = await Category.findOne({ _id: `${req.params.id}` }).exec();
        console.log(categoryObj, "oooooo")
        if (!categoryObj) throw { status: 400, message: "category Not Found" };

        await Category.findOneAndUpdate({ _id: req.params.id }, { $set: { isDeleted: true } }).exec();
        res.status(200).json({ message: "category Deleted", success: true });
    } catch (err) {
        next(err);
    }
};

export const getNestedCategory = async (req, res, next) => {
    try {
        let mainCategoryArr = await Category.find({ "deletedObj.deletedBool": false }).lean().exec();
        // console.log(mainCategoryArr, "mainCategoryArr");
        const setSubcategoryArr = (id) => {
            if (!id) return [];
            let tempArr = mainCategoryArr.filter((el) => el.parentCategoryId == `${id}`);
            if (tempArr.length == 0) return [];
            console.log(tempArr, "tempArr8");
            return tempArr
                .map((el) => {
                    let obj = {
                        ...el,
                        label: el.name,
                        value: el._id,
                        subCategoryArr: setSubcategoryArr(el._id),
                        isExpanded: true,
                        checked: false,
                    };
                    return obj;
                })
                .sort((a, b) => a.order - b.order);
        };
        let finalArr = mainCategoryArr
            .filter((el) => el.level == 1)
            .map((el) => {
                let obj = {
                    ...el,
                    label: el.name,
                    value: el._id,
                    subCategoryArr: setSubcategoryArr(el._id),
                    isExpanded: true,
                    checked: false,
                };
                return obj;
            })
            .sort((a, b) => a.order - b.order);
        console.log(finalArr, "finalArr");
        res.status(200).json({ message: "Category Arr", data: finalArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const getChildCategoryByParentId = async (req, res, next) => {
    try {
        let ChildCategoryArr = await Category.find({ parentCategoryId: req.params.id }).lean().exec();

        res.status(200).json({ message: "ChildCategory", data: ChildCategoryArr, success: true });

        // let categoryArr = await Category.find({ parentCategoryArr: { $elemMatch: { parentId: req.params.id } } })
        // console.log(categoryArr)
        // res.status(200).json({ message: "ChildCategory", data: categoryArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const getSpecialEdition = async (req, res, next) => { // getTrending products
    try {
        let categoryArray = await Category.find({ specialEdition: true }).select({ _id: 1, name: 1, categoryImage: 1 }).lean().exec();
        console.log(categoryArray, "categoryArray")

        res.status(200).json({ message: "specialEdition", data: categoryArray, success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// import XLSX from "xlsx";
export const bulkUpload = async (req, res, next) => {
    try {
        console.log(req.file, "req.file")
        let workbook = XLSX.readFile(req.file.path);
        // console.log(workbook, "req.filewwwwww")
        let sheet_nameList = workbook.SheetNames;
        // console.log(sheet_nameList[0], "sheet_nameList")
        let x = 0;
        sheet_nameList.forEach(element => {
            let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_nameList[x]]);
            // for (let el of xlData) {
            //     Category.insertMany(el)
            // }
            Category.insertMany(xlData, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data, "data345235")
                }
            });
            x++
        });
        let arr = await Category.find().exec()
        res.status(200).json({ message: "successfully upload file", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};