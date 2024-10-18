import { isValid } from "../helpers/Validators";
import Location from "../models/Location.model";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import XLSX from "xlsx";
export const addNew = async (req, res, next) => {
  //for user
  try {
    console.log("locationnnnnnnlocationnnnnnnlocationnnnnnnlocationnnnnnn");

    if (!req.body.name) throw new Error("name is mandatory");
    if (!isValid(req.body.name)) throw new Error("Name cant be empty");

    let existsCheck = await Location.findOne({ name: req.body.name }).exec();
    if (existsCheck) {
      throw new Error("Location with same name already exists !");
    }
    if (req.body.imageUrl) {
      req.body.imageUrl = await storeFileAndReturnNameBase64(req.body.imageUrl);
    }

    if (!req.body.slug) {
      const slugify = req.body.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      req.body.slug = slugify;
    }
    new Location(req.body).save();
    res
      .status(200)
      .json({ message: "Location Successfully Created", success: true });
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
    let query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.q) {
      query.name = new RegExp(`^${req.query.q}`, "i");
    }
    let Arr = await Location.find(query).exec();

    res.status(200).json({ message: "found Items", data: Arr, success: true });
  } catch (err) {
    next(err);
  }
};

export const getFromSlug = async (req, res, next) => {
  //for admin
  try {
    let locationObj = await Location.findOne({ slug: req.params.id }).exec();
    if (!locationObj) {
      throw new Error("Location does not exist !");
    }
    res
      .status(200)
      .json({ message: "found Items", data: locationObj, success: true });
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

    let existsCheck = await Location.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Location does not exist !");
    }

    if (req.body.imageUrl && `${req.body.imageUrl}`.includes("base64")) {
      req.body.imageUrl = await storeFileAndReturnNameBase64(req.body.imageUrl);
    }

    if (!req.body.slug) {
      const slugify = req.body.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      req.body.slug = slugify;
    }
    await Location.findByIdAndUpdate(existsCheck._id, req.body).exec();
    res.status(200).json({ message: "Updated Successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  //for admin ,subadmin
  try {
    // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete review");
    let existsCheck = await Location.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Location does not exist !");
    }
    await Location.findByIdAndDelete(existsCheck._id).exec();

    res.status(200).json({ message: "Deleted successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const bulkUploadLocation = async (req, res, next) => {
  try {
    // console.log(req.file, "req.file");
    let workbook = XLSX.readFile(req.file.path);
    // console.log(workbook, "req.filewwwwww")
    let sheet_nameList = workbook.SheetNames;
    // console.log(sheet_nameList[0], "sheet_nameList")
    let x = 0;

    let xlData = [];
    console.log(sheet_nameList);
    sheet_nameList.forEach((element) => {
      console.log(element);
      xlData.push(
        ...XLSX.utils.sheet_to_json(workbook.Sheets[sheet_nameList[x]])
      );
      x++;
    });

    let errorArr = [];

    console.log(xlData, "xlData xlData xlData"); //done

    // console.log(xlData.map(el => el["PRIMARY CATEGORY"]), "xlData xlData xlData"); //done
    let tempArr = [];
    for (let index = 0; index < xlData.length; index++) {
      let existObj = await Location.findOne({
        name: xlData[index]["name"],
        countryCode: xlData[index]["code"],
      });
      if (existObj) {
      } else {
        let tempObj = {
          name: xlData[index]["name"],
          countryCode: xlData[index]["code"],
          countryRezId: xlData[index]["id"],
        };
        await new Location(tempObj).save();
      }
    }

    res
      .status(200)
      .json({ message: "Successfully Uploaded file", success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
