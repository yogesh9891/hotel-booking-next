import States from "../models/State.model";
import City from "../models/City.model";
import Area from "../models/Country.model";
import Users from "../models/user.model";
import wareHouse from "../models/wareHouse.model";
import { isValid } from "../helpers/Validators";
export const addNew = async (req, res, next) => { //for user
    try {
        if (!req.body.name) throw new Error("name is mandatory");
        if (!isValid(req.body.name)) throw new Error('Name cant be empty');

        let existsCheck = await wareHouse.findOne({ name: req.body.name }).exec()
        if (existsCheck) {
            throw new Error("wareHouse with same name already exists !");
        }
        if (!req.body.user) {
            throw new Error("Please user assigned !");
        }

        if (req.body.user) {
            let userObj = req.body.user;

            let existsCheck = await Users.findOne({ email: userObj.email }).exec()
            if (existsCheck) {
                throw new Error("user  with same email already exists !");
            }
            let user = await new Users(userObj).save();
            req.body.userId = user._id;
        }

        new wareHouse(req.body).save()
        res.status(200).json({ message: "wareHouse Successfully Created", success: true });
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

        let Arr = await wareHouse.find().lean().exec()
        for (const el of Arr) {

            let stateObj = {};
            let cityObj = {};
            let areaObj = {};
            let userObj = {};
            try {
                stateObj = await States.findById(el.stateId).exec()
                cityObj = await City.findById(el.cityId).exec()
                areaObj = await Area.findById(el.areaId).exec()
                userObj = await Users.findById(el.userId).exec()

            } catch (error) {

            }
            el.stateObj = stateObj;
            el.cityObj = cityObj;
            el.areaObj = areaObj;
            el.userObj = userObj;
        }
        res.status(200).json({ message: "found Items", data: Arr, success: true });
    } catch (err) {
        next(err);
    }
};


export const updateById = async (req, res, next) => { //for user 
    try {
        if (!req.body.name) throw new Error("name is mandatory");
        if (!isValid(req.body.name)) throw new Error('Name cant be empty');

        let existsCheck = await wareHouse.findById(req.params.id).exec();
        if (!existsCheck) {
            throw new Error("wareHouse does not exist !");
        }
        await wareHouse.findByIdAndUpdate(existsCheck._id, req.body).exec()
        res.status(200).json({ message: "Updated Successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => { //for admin ,subadmin 
    try {
        // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete review");
        let existsCheck = await wareHouse.findById(req.params.id).exec()
        if (!existsCheck) {
            throw new Error("wareHouse does not exist !");
        }
        await wareHouse.findByIdAndDelete(existsCheck._id).exec()

        res.status(200).json({ message: "Deleted successfully", success: true });
    } catch (err) {
        next(err);
    }
};

