import authorizeJwt from "../middlewares/auth.middleware";
import Category from "../models/category.model";
import menu from "../models/menu.model";
import Users from "../models/user.model";
import Product from "../models/product.model";

export const addMenu = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [
                { _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
                { _id: req.user.userId, role: "SELLER" },
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to create menu");

        let menuExist = await menu.findOne({ menuName: req.body.menuName }).exec();
        if (menuExist) throw new Error("menu exist");

        let obj = {};
        if (req.body.type == 'category') {
            let category = await Category.findById(req.body.categoryId).exec()
            if (!category) throw new Error("category not exist");
            obj.categoryId = req.body.categoryId,
                obj.target = 'SAME-TAB',
                obj.parentMenuItem = req.body.parentMenuItem,
                obj.menuName = req.body.menuName,
                obj.type = req.body.type,
                obj.status = req.body.status
        }
        if (req.body.type == 'page') {
            obj.menuName = req.body.menuName,
                obj.type = req.body.type,
                obj.page = req.body.page,
                obj.target = req.body.target,
                obj.parentMenuItem = req.body.parentMenuItem,
                obj.status = req.body.status
        }
        if (req.body.type == 'URL') {
            obj.menuName = req.body.menuName,
                obj.type = req.body.type, //url               
                obj.url = req.body.url, //www.gogole./
                obj.target = req.body.target, //NEW-TAB
                obj.parentMenuItem = req.body.parentMenuItem,
                obj.status = req.body.status
        }

        let menuArr = await menu.find().exec();
        let sortIdFound = menuArr[menuArr.length - 1].sortId;
        // console.log(sortIdFound, "sortIdFound")
        if (sortIdFound) {
            obj.sortId = sortIdFound + 1
        } else {
            obj.sortId = 1
        };

        await menu(obj).save();

        res.status(201).json({ message: "menu Register successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const getMenuForAdmin = async(req, res, next) => { //admin 
    try {
        let validityCheck = await Users.findOne({
            $or: [
                { _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
                { _id: req.user.userId, role: "SELLER" }
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to create menu");
        const getMenu = await menu.find().exec();
        res.status(200).json({ message: "Menu", data: getMenu, success: true });
    } catch (err) {
        next(err);
    }
};
export const getMenu = async(req, res, next) => { // for user
    try {

        const getMenu = await menu.find({ isDeleted: false }).exec();
        res.status(200).json({ message: "Menu", data: getMenu, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
                { _id: req.user.userId, role: "SELLER" },
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to update menu");
        let menuFound = await menu.findOne({ menuName: req.body.menuName });

        if (menuFound) throw { status: 400, message: " this menu'name exist, update with unique name" };

        let obj = {};
        if (req.body.type == 'category') {
            let category = await Category.findById(req.body.categoryId).exec()
            if (!category) throw new Error("category not exist");
            obj.categoryId = req.body.categoryId,
                obj.target = 'SAME-TAB',
                obj.parentMenuItem = req.body.parentMenuItem,
                obj.menuName = req.body.menuName,
                obj.type = req.body.type,
                obj.status = req.body.status
        }
        if (req.body.type == 'page') {
            obj.menuName = req.body.menuName,
                obj.type = req.body.type,
                obj.page = req.body.page,
                obj.target = req.body.target,
                obj.parentMenuItem = req.body.parentMenuItem,
                obj.status = req.body.status
        }
        if (req.body.type == 'URL') {
            obj.menuName = req.body.menuName,
                obj.type = req.body.type, //url               
                obj.url = req.body.url, //www.gogole./
                obj.target = req.body.target, //NEW-TAB
                obj.parentMenuItem = req.body.parentMenuItem,
                obj.status = req.body.status
        }
        const menuObj = await menu.findByIdAndUpdate(req.params.id, obj).exec();

        if (!menuObj) throw { status: 400, message: "menu  Not Found" };
        res.status(200).json({ message: "menu Updated", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
                { _id: req.user.userId, role: "SELLER" },
            ]
        }).exec();
        if (!validityCheck) throw new Error("you are not authorise to delete menu");

        let menuObj = await menu.findOne({ _id: req.params.id, isDeleted: false }).exec();
        if (!menuObj) throw { status: 400, message: "menu not found or deleted already " };

        await menu.findByIdAndUpdate(req.params.id, { $set: { isDeleted: true } }).exec();
        res.status(200).json({ msg: "menu deleted successfully", success: true });

    } catch (err) {
        next(err);
    }
};


export const sortMenu = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
                { _id: req.user.userId, role: "SELLER" },
            ]
        }).exec()
        if (!validityCheck) throw new Error("you are not authorise to sort menu");
        // let sort
        let arr = await menu.find({ isDeleted: false }).exec(); //.sort({ sortId: 1 }).exec();

        arr.sort((a, b) => (a.sortId > b.sortId) ? 1 : ((b.sortId > a.sortId) ? -1 : 0));
        console.log(arr, 'arr ')
        res.status(201).json({ message: "Menu sort successfully", data: arr, success: true });
    } catch (err) {
        next(err);
    }
};


export const swapMenu = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
                { _id: req.user.userId, role: "SELLER" },
            ]
        }).exec()
        if (!validityCheck) throw new Error("you are not authorise to change the menu'order");
        let menuId1 = await menu.findOne({ _id: `${req.body.menuId1}` });
        let menuId2 = await menu.findOne({ _id: `${req.body.menuId2}` });
        console.log(menuId1.sortId, "2341")
        console.log(menuId2.sortId, "252")
        console.log("ppppppppppppp")
        let objArr = await menu.updateMany({
            $switch: {
                //     sortId: [
                //         // { case: { $eq: { _id: `${req.body.menuId1}` } }, then: `${req.body.menuId2}` },
                //         { case: { $eq: parseInt(menuId1.sortId) }, then: parseInt(menuId2.sortId) },
                //         // { case: { $eq: { _id: `${req.body.menuId2}` } }, then: `${req.body.menuId1}` },
                //         { case: { $eq: parseInt(menuId2.sortId) }, then: parseInt(menuId1.sortId) },
                //     ]
                sortId: { case: { $eq: parseInt(menuId1.sortId) }, then: parseInt(menuId2.sortId) },
                sortId: { case: { $eq: parseInt(menuId2.sortId) }, then: parseInt(menuId1.sortId) },
            }
            // $set: {
            //     sortId: menuId1.sort
            // }
        }).exec();
        // objArr = await menu.findAndUpdate({})
        console.log(objArr, "objArr");
        res.status(201).json({ message: "swap successfully", data: objArr, success: true });
    } catch (err) {
        next(err);
    }
};

// let menuId1 = menuArr.findIndex((doc) => `${doc._id}` === `${req.body.menuId1}`);
// let menuId1 = menuArr.findIndex((doc) => `${doc._id}` === `${req.body.menuId1}`);
//
// let menuArr = await menu.find();
// menuArr = await menu.updateMany()
// // console.log(menuArr.findIndex((doc) => `${doc._id}` === `${req.body.menuId2}`), "uuuuuuuuuu")

// let menuObj1 = await menu.findById(req.body.menuId1).exec();
// let menuObj2 = await menu.findById(req.body.menuId2).exec();