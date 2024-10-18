import Country from "../models/Country.model";
import State from "../models/State.model";
import { isValid } from "../helpers/Validators";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
export const addNew = async (req, res, next) => { //for user
    try {
        if (!req.body.name) throw new Error("name is mandatory");
        if (!isValid(req.body.name)) throw new Error('Name cant be empty');

        let existsCheck = await State.findOne({ name: req.body.name }).exec()
        if (existsCheck) {
            throw new Error("State with same name already exists !");
        }
        if (req.body.imageUrl) {
            req.body.imageUrl = await storeFileAndReturnNameBase64(req.body.imageUrl)
        }
        new State(req.body).save()
        res.status(200).json({ message: "State Successfully Created", success: true });
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
        let Arr = []
        // console.log(req.query ? "t" : "f")
        if (req.query.countryId) {
            Arr = await State.find({ countryId: req.query.countryId }).lean().exec()
        }
        else {
            Arr = await State.find().lean().exec()
        }
        for (const el of Arr) {
            let countryObj = await Country.findById(el.countryId).exec()
            el.countryObj = countryObj;
        }
        console.log(Arr, "Arr")
        res.status(200).json({ message: "found Items", data: Arr, success: true });
    } catch (err) {
        next(err);
    }
};


export const updateById = async (req, res, next) => { //for user 
    try {
        if (!req.body.name) throw new Error("name is mandatory");
        if (!isValid(req.body.name)) throw new Error('Name cant be empty');

        let existsCheck = await State.findById(req.params.id).exec()
        if (!existsCheck) {
            throw new Error("State does not exist !");
        }
        if (req.body.imageUrl && `${req.body.imageUrl}`.includes("base64")) {
            req.body.imageUrl = await storeFileAndReturnNameBase64(req.body.imageUrl)
        }
        await State.findByIdAndUpdate(existsCheck._id, req.body).exec()
        res.status(200).json({ message: "Updated Successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => { //for admin ,subadmin 
    try {
        // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete review");
        let existsCheck = await State.findById(req.params.id).exec()
        if (!existsCheck) {
            throw new Error("State does not exist !");
        }
        await State.findByIdAndDelete(existsCheck._id).exec()

        res.status(200).json({ message: "Deleted successfully", success: true });
    } catch (err) {
        next(err);
    }
};

