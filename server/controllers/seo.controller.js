import { isValid } from "../helpers/Validators";
import Seo from "../models/Seo.model";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import XLSX from "xlsx";
export const addNew = async (req, res, next) => {
  //for user
  try {
    console.log("seonnnnnnseonnnnnnseonnnnnnseonnnnnn");

    if (!req.body.name) throw new Error("name is mandatory");
    if (!isValid(req.body.name)) throw new Error("Name cant be empty");

    let existsCheck = await Seo.findOne({ name: req.body.name }).exec();
    if (existsCheck) {
      throw new Error("Seo with same name already exists !");
    }
    if (req.body.imageUrl) {
      req.body.imageUrl = await storeFileAndReturnNameBase64(req.body.imageUrl);
    }
    if (!req.body.slug) {
      const slugify = req.body.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      req.body.slug = slugify;
    }

    new Seo(req.body).save();
    res.status(200).json({ message: "Seo Successfully Created", success: true });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  //for admin
  try {
    // let validityCheck = await Users.findOne({
    //     $or: [{ _id: req.user.userId, role: "ADMIN" },
    //     { _id: req.user.userId, role: "SUBADMIN" },
    //     { _id: req.user.userId, role: "SELLER" },
    //     ]
    // }).exec();
    // if (!validityCheck) throw new Error("you are not authorise to check review");

    let Arr = await Seo.find().exec();

    res.status(200).json({ message: "found Items", data: Arr, success: true });
  } catch (err) {
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  //for user
  try {
    console.log(req.body);
    if (!req.body.name) throw new Error("name is mandatory");
    if (!isValid(req.body.name)) throw new Error("Name cant be empty");

    let existsCheck = await Seo.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Seo does not exist !");
    }

    if (req.body.imageUrl && `${req.body.imageUrl}`.includes("base64")) {
      req.body.imageUrl = await storeFileAndReturnNameBase64(req.body.imageUrl);
    }
    if (!req.body.slug) {
      const slugify = req.body.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      req.body.slug = slugify;
    }

    await Seo.findByIdAndUpdate(existsCheck._id, req.body).exec();
    res.status(200).json({ message: "Updated Successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  //for admin ,subadmin
  try {
    // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete review");
    let existsCheck = await Seo.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Seo does not exist !");
    }
    await Seo.findByIdAndDelete(existsCheck._id).exec();

    res.status(200).json({ message: "Deleted successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const getSeoByUrl = async (req, res, next) => {
  try {
    if(!req.query.url){
      res.status(201).json({ success: false });
    }
      const get = await Seo.findOne({url:req.query.url}).exec();
      res.status(200).json({ message: " seo  successfully", data: get, success: true });
  } catch (err) {
      next(err);
  }
};