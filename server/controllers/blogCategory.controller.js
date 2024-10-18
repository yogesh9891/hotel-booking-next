import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import blogCategory from "../models/blogCategory.model";

import Users from "../models/user.model";

export const addBlogCategory = async(req, res, next) => {
    try {
        let validityCheck = await Users.findOne({
            $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" }
            ]
        }).exec()
        if (!validityCheck) throw new Error("you are not authorise to add BlogCategory");
        if (req.body.image) {
            req.body.image = await storeFileAndReturnNameBase64(req.body.image);
        };
        let foundBlog = await blogCategory.findOne({ name: req.body.name }).exec();
        if (foundBlog) throw { status: 400, message: "blog already registered" };
        // let obj = {
        //     name: req.body.name,
        //     image: req.body.image
        // };
        await blogCategory(req.body).save();
        res.status(201).json({ message: "blog category created successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const getBlogCategory = async(req, res, next) => {
    try {
        const get = await blogCategory.find().exec();
        // console.log(get, "pp");
        res.status(200).json({ message: "get blog", data: get, success: true });
    } catch (err) {
        next(err);
    }
};

export const getBlogCategoryById = async(req, res, next) => {
    try {
        const get = await blogCategory.findById(req.params.id).exec();
        // console.log(get, "pp");
        res.status(200).json({ message: "get blog", data: get, success: true });
    } catch (err) {
        next(err);
    }
};


export const updateById = async(req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [{ _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" }
        //         // { _id: req.user.userId, role: "SELLER" },
        //     ]
        // }).exec()
        // if (!validityCheck) throw new Error("you are not authorise to update blog");
        if (req.body.image && `${req.body.image}`.includes('data:image')) {
            req.body.image = await storeFileAndReturnNameBase64(req.body.image);
        };
        const obj = await blogCategory.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!obj) throw { status: 400, message: "blog Not Found" };

        res.status(200).json({ message: "blog Updated", success: true });
    } catch (err) {
        next(err);
    };
};

export const deleteById = async(req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [{ _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" }
        //     ]
        // }).exec()
        // if (!validityCheck) throw new Error("you are not authorise to delete blog");
        const obj = await blogCategory.findByIdAndDelete(req.params.id).exec();
        if (!obj) throw { status: 400, message: "blog Not Found" };
        res.status(200).json({ message: "blog Deleted", success: true });
    } catch (err) {
        next(err);
    };
};