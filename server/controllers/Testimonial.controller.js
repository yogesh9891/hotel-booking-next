import { isValid } from "../helpers/Validators";
import Testimonial from "../models/testimonial.model";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";

export const addNew = async (req, res, next) => {
  //for user
  try {
    console.log(req.body);

    if (!req.body.name) throw new Error("name is mandatory");
    // if (!isValid(req.body.name)) throw new Error('Name cant be empty');

    // let existsCheck = await Testimonial.findOne({ name: req.body.name }).exec();
    // if (existsCheck) {
    //   throw new Error("Testimonial with same name already exists !");
    // }
    if (req.body.imageUrl) {
      req.body.imageUrl = await storeFileAndReturnNameBase64(req.body.imageUrl);
    }
    new Testimonial(req.body).save();
    res
      .status(200)
      .json({ message: "Testimonial Successfully Created", success: true });
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
    let Arr = await Testimonial.find().exec();

    let query = {}
    if (req.query.limit) {
      Arr = await Testimonial.find(query).limit(req.query.limit).exec()
    } else {
      Arr = await Testimonial.find(query).exec()
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

    let existsCheck = await Testimonial.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Testimonial does not exist !");
    }
    if (req.body.imageUrl && `${req.body.imageUrl}`.includes("base64")) {
      req.body.imageUrl = await storeFileAndReturnNameBase64(req.body.imageUrl);
    }
    await Testimonial.findByIdAndUpdate(existsCheck._id, req.body).exec();
    res.status(200).json({ message: "Updated Successfully", success: true });
  } catch (err) {
    next(err);
  }
  // await Testimonial.findByIdAndUpdate(existsCheck._id, req.body).exec();
  //     res
  //       .status(200)
  //       .json({ message: "Testimonial Update Successfully", success: true });
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

    let existsCheck = await Testimonial.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Testimonial does not exist !");
    }
    res.status(200).json({ message: "Updated Successfully", data: existsCheck, success: true });
  } catch (err) {
    next(err);
  }
  // await Testimonial.findByIdAndUpdate(existsCheck._id, req.body).exec();
  //     res
  //       .status(200)
  //       .json({ message: "Testimonial Update Successfully", success: true });
  //   } catch (err) {
  //     next(err);
  //   }
};

export const deleteById = async (req, res, next) => {
  //for admin ,subadmin
  try {
    // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete review");
    let existsCheck = await Testimonial.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Testimonial does not exist !");
    }
    await Testimonial.findByIdAndDelete(existsCheck._id).exec();

    res
      .status(200)
      .json({ message: " Testimonial Deleted successfully", success: true });
  } catch (err) {
    next(err);
  }
  // await Testimonial.findByIdAndDelete(existsCheck._id).exec();

  //     res
  //       .status(200)
  //       .json({ message: "Testimonial delete successfully", success: true });
  //   } catch (err) {
  //     next(err);
  //   }
};
