import { isValid } from "../helpers/Validators";
import Package from "../models/package.model";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";

export const addNew = async (req, res, next) => { //for user
    try {
        console.log(req.body)

        if (!req.body.name) throw new Error("name is mandatory");
        if (!isValid(req.body.name)) throw new Error('Name cant be empty');

        let existsCheck = await Package.findOne({ name: req.body.name }).exec()
        if (existsCheck) {
            throw new Error("Package with same name already exists !");
        }

        if (req.body.mainImageStr) {
            req.body.mainImage = await storeFileAndReturnNameBase64(req.body.mainImageStr);
        }

        if (req.body.bannerImageStr) {
            req.body.bannerImage = await storeFileAndReturnNameBase64(req.body.bannerImageStr);
        }

        new Package(req.body).save()
        res.status(200).json({ message: "Package Successfully Created", success: true });
    } catch (err) {
        next(err);
    }
};

export const getAll = async (req, res, next) => { //for admin
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [{ _id: req.user.userId, role: "ADMIN" },
        //     { _id: req.user.userId, role: "SUBADMIN" },
        //     { _id: req.user.userId, role: "SELLER" },
        //     ]
        // }).exec();
        // if (!validityCheck) throw new Error("you are not authorise to check review");

        let Arr = await Package.find().exec()

        res.status(200).json({ message: "found Items", data: Arr, success: true });
    } catch (err) {
        next(err);
    }
};


export const updateById = async (req, res, next) => { //for user 
    try {
        console.log(req.body)
        if (!req.body.name) throw new Error("name is mandatory");
        if (!isValid(req.body.name)) throw new Error('Name cant be empty');

        let existsCheck = await Package.findById(req.params.id).exec()
        if (!existsCheck) {
            throw new Error("Package does not exist !");
        }

        if (req.body.mainImageStr && req.body.mainImageStr.startsWith("data:")) {
            req.body.mainImage = await storeFileAndReturnNameBase64(req.body.mainImageStr);
        }

        if (req.body.bannerImageStr && req.body.bannerImageStr.startsWith("data:")) {
            req.body.bannerImage = await storeFileAndReturnNameBase64(req.body.bannerImageStr);
        }

        await Package.findByIdAndUpdate(existsCheck._id, req.body).exec()
        res.status(200).json({ message: "Updated Successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => { //for admin ,subadmin 
    try {
        // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete review");
        let existsCheck = await Package.findById(req.params.id).exec()
        if (!existsCheck) {
            throw new Error("Package does not exist !");
        }
        await Package.findByIdAndDelete(existsCheck._id).exec()

        res.status(200).json({ message: "Deleted successfully", success: true });
    } catch (err) {
        next(err);
    }
};

