import authorizeJwt from "../middlewares/auth.middleware";
import Category from "../models/category.model";
import menu from "../models/menu.model";
import mainMenu from "../models/mainMenu.model";
import Users from "../models/user.model";
import Product from "../models/product.model";

export const addMainMenu = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
                { _id: req.user.userId, role: "SELLER" },
            ]
        }).exec()
        if (!validityCheck) throw new Error("you are not authorise to create main menu");

        let menuFound = await mainMenu.findOne({ name: req.body.headerName });
        if (menuFound) throw { status: 400, message: " this menu'name exist, create with unique name" };

        let obj = {}
        if (req.body.headerName) {
            obj.headerName = req.body.headerName
            obj.menu = await menu.findById(req.body.menuId);
        };
        if (req.body.footerName) {
            obj.footerName = req.body.footerName
            obj.menu = await menu.findById(req.body.menuId);

        };
        await mainMenu(obj).save();
        res.status(201).json({ message: "mainMenu add successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const getMainMenu = async(req, res, next) => {
    try {
        const getMenuArr = await mainMenu.find().exec();
        let mainMenuArr = [];
        for (let el of getMenuArr) {
            let findMenu = await menu.findById(el.menuId).exec();
            mainMenuArr.push({
                headerName: el.headerName,
                menuDetails: findMenu
            })
        }
        // console.log(mainMenuArr, "mainMenuArr");
        res.status(200).json({ message: "Menu", data: mainMenuArr, success: true });
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
        let menuFound = await mainMenu.findOne({ headerName: req.body.headerName });
        if (menuFound) throw { status: 400, message: " this menu'name exist, update with unique name" };

        let obj = {}
        if (req.body.headerName) {
            obj.headerName = req.body.headerName;
            let menuId = await menu.findById(req.body.menuId);
            obj.menuId = menuId;
            // console.log(menuId, "menuId")
        };
        if (req.body.footerName) {
            obj.footerName = req.body.footerName;
            let menuId = await menu.findById(req.body.menuId);
            obj.menuId = menuId;
        };
        const menuObj = await mainMenu.findByIdAndUpdate(req.params.id, obj).exec();
        if (!menuObj) throw { status: 400, message: "menu  Not Found" };
        // console.log(obj, "opbj")
        res.status(200).json({ message: "menu Updated", menuObj, success: true });
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
        if (!validityCheck) throw new Error("you are not authorise to delete mainMenu");

        let menuObj = await mainMenu.findOne({ _id: req.params.id, isDeleted: false }).exec();
        if (!menuObj) throw { status: 400, message: "mainMenu not found or deleted already " };

        await mainMenu.findByIdAndUpdate(req.params.id, { $set: { isDeleted: true } }).exec();
        res.status(200).json({ msg: "mainMenu deleted successfully", success: true });

    } catch (err) {
        next(err);
    }
};



// export const sortMainMenu = async(req, res, next) => {
//     try {
//         let validityCheck = await Users.findOne({
//             $or: [{ _id: req.user.userId, role: "ADMIN" },
//                 { _id: req.user.userId, role: "SUBADMIN" },
//                 { _id: req.user.userId, role: "SELLER" },
//             ]
//         }).exec()
//         if (!validityCheck) throw new Error("you are not authorise to sort main menu");

//         // let menuFound = await mainMenu.findOne({ name: req.body.headerName });
//         // if (menuFound) throw { status: 400, message: " this menu'name exist, update with unique name" };

//         // let obj = {}
//         // if (req.body.header) {
//         //     obj.menu = await menu.findById(req.body.menuId);
//         // };
//         // if (req.body.footer) {
//         //     obj.menu = await menu.findById(req.body.menuId);

//         // };
//         await mainMenu(obj).save();
//         res.status(201).json({ message: "mainMenu add successfully", success: true });
//     } catch (err) {
//         next(err);
//     }
// };