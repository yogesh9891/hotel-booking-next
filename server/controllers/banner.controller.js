import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import Banner from "../models/banner.model";
import Users from "../models/user.model";

export const addBanner = async (req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [{ _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" },
        //         { _id: req.user.userId, role: "SELLER" },
        //     ]
        // }).exec()
        // if (!validityCheck) throw new Error("you are not authorise to add banner");

        if (req.body.image) {
            req.body.image = await storeFileAndReturnNameBase64(req.body.image);
        };
        // let foundUrl = await Banner.findOne({ url: req.body.url }).exec();
        // if (foundUrl) throw { status: 400, message: "url already registered" };
        // console.log(req.body);
        let obj = {

        }
        let bannerObj = await Banner(req.body).save();

        res.status(201).json({ message: "banner Registered", success: true });
    } catch (err) {
        next(err);
    }
};

export const getBanner = async (req, res, next) => {
    try {

        let query = {}
        if(req.query.status){
            query.status = req.query.status;
        }
        const getBanner = await Banner.find(query).exec();
        console.log(getBanner, "pp");
        res.status(200).json({ message: "getBanner", data: getBanner, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async (req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [{ _id: req.user.userId, role: "ADMIN" },
        //     { _id: req.user.userId, role: "SUBADMIN" },
        //     { _id: req.user.userId, role: "SELLER" },
        //     ]
        // }).exec()
        // if (!validityCheck) throw new Error("you are not authorise to update banner");
        if (req.body.image && `${req.body.image}`.includes('data:image')) {
            req.body.image = await storeFileAndReturnNameBase64(req.body.image);
        };

        const bannerObj = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!bannerObj) throw { status: 400, message: "banner Not Found" };
        console.log(bannerObj);
        res.status(200).json({ message: "banner Updated", success: true });
    } catch (err) {
        next(err);
    };
};

export const deleteById = async (req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
            { _id: req.user.userId, role: "SUBADMIN" },
            { _id: req.user.userId, role: "SELLER" },
            ]
        }).exec()
        if (!validityCheck) throw new Error("you are not authorise to delete banner");
        const bannerObj = await Banner.findByIdAndDelete(req.params.id).exec();
        if (!bannerObj) throw { status: 400, message: "banner Not Found" };
        res.status(200).json({ message: "banner Deleted", success: true });
    } catch (err) {
        next(err);
    };
};

export const getActiveBanner = async (req, res, next) => {
    try {
        const getBannerArr = await Banner.find({ status: true }).select({ _id: 1, name: 1, image: 1 }).lean().exec();

        res.status(200).json({ message: "activeBanner", data: getBannerArr, success: true });
        console.log(getBanner, "pp");

    } catch (err) {
        next(err);
    }
};