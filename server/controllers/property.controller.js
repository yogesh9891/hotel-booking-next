import { isValid } from "../helpers/Validators";
import Property from "../models/property.model";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";

export const addNew = async (req, res, next) => {
  //for user
  try {
    console.log(req.body);

    if (!req.body.name) throw new Error("name is mandatory");
 
    if (req.body.mainImage) {
      req.body.mainImage = await storeFileAndReturnNameBase64(req.body.mainImage);
    }
    if(req.body.imagesArr && req.body.imagesArr?.length > 0 ){

    for (const ele of req.body.imagesArr) {
      if (ele.imageUrl) {
        ele.imageUrl = await storeFileAndReturnNameBase64(ele.imageUrl);
      }
    }
  }
  if(req.body.roomsArr &&  req.body.roomsArr?.length > 0){

    for (const el of req.body.roomsArr) {

      if (el.image) {
        el.image = await storeFileAndReturnNameBase64(el.image);
      }
    }
  }
    new Property(req.body).save();
    res
      .status(200)
      .json({ message: "Your Property Query Submit Successfully.We will Contact you soon", success: true });
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
    let Arr = await Property.find().sort({createdAt:-1}).exec();

    let query = {}
    if (req.query.limit) {
      Arr = await Property.find(query).sort({createdAt:-1}).limit(req.query.limit).exec()
    } else {
      Arr = await Property.find(query).sort({createdAt:-1}).exec()
    }

    console.log(Arr.length,"Arr")
    res.status(200).json({ message: "found Items", data: Arr, success: true });
  } catch (err) {
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  //for user
  try {
    console.log(req.body);
    // if (!req.body.name) throw new Error("name is mandatory");
    // if (!isValid(req.body.name)) throw new Error('Name cant be empty');

    let existsCheck = await Property.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Gallery does not exist !");
    }
    if (req.body.imageUrl && `${req.body.imageUrl}`.includes("base64")) {
      req.body.imageUrl = await storeFileAndReturnNameBase64(req.body.imageUrl);
    }
    await Property.findByIdAndUpdate(existsCheck._id, req.body).exec();
    res.status(200).json({ message: "Updated Successfully", success: true });
  } catch (err) {
    next(err);
  }
  // await Property.findByIdAndUpdate(existsCheck._id, req.body).exec();
  //     res
  //       .status(200)
  //       .json({ message: "Gallery Update Successfully", success: true });
  //   } catch (err) {
  //     next(err);
  //   }
};


export const getById = async (req, res, next) => {
  //for user
  try {
    console.log(req.body);
    // if (!req.body.name) throw new Error("name is mandatory");
    // if (!isValid(req.body.name)) throw new Error('Name cant be empty');

    let existsCheck = await Property.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Gallery does not exist !");
    }
    res.status(200).json({ message: "Updated Successfully", data: existsCheck, success: true });
  } catch (err) {
    next(err);
  }
  // await Property.findByIdAndUpdate(existsCheck._id, req.body).exec();
  //     res
  //       .status(200)
  //       .json({ message: "Gallery Update Successfully", success: true });
  //   } catch (err) {
  //     next(err);
  //   }
};

export const deleteById = async (req, res, next) => {
  //for admin ,subadmin
  try {
    // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete review");
    let existsCheck = await Property.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Gallery does not exist !");
    }
    await Property.findByIdAndDelete(existsCheck._id).exec();

    res
      .status(200)
      .json({ message: " Gallery Deleted successfully", success: true });
  } catch (err) {
    next(err);
  }
  // await Property.findByIdAndDelete(existsCheck._id).exec();

  //     res
  //       .status(200)
  //       .json({ message: "Gallery delete successfully", success: true });
  //   } catch (err) {
  //     next(err);
  //   }
};
