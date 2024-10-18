import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import review from "../models/review.model";
import Users from "../models/user.model";

import { isValid } from "../helpers/Validators";
import { generalModelStatuses } from "../helpers/Constants";
import HotelModel from "../models/Hotel.model";
import reviewModel from "../models/review.model";

export const addReview = async (req, res, next) => {
  //for user
  try {
    console.log(req.body);
    // let userfound = await Users.findOne({ _id: req.user.userId }).exec();
    // if (!userfound) throw new Error('you are not register');
    console.log(req.body.userId);
    // let statusFound = await reviewSetting.findOne({ userId: `${req.user.userId}` }).exec();

    // console.log(statusFound, "statusFound")
    let userFound = await review
      .findOne({ userId: req.user.userId, hotelId: req.body.hotelId })
      .lean()
      .exec();

    if (userFound) throw new Error("you already give review for this product");

    if (!req.body.rating) throw new Error("rating is mandatory");
    if (!isValid(req.body.rating)) throw new Error("rating cant be empty");

    if (!req.body.message) throw new Error("message is mandatory");
    if (req.body.rating) {
      if (req.body.rating > 5 || req.body.rating < 0) {
        throw new Error(" review cant be more than 5 or negative");
      }
    }

    let obj = {};

    obj = {
      message: req.body.message,
      title: req.body.title,
      rating: req.body.rating,
      userId: req.user.userId,
      hotelId: req.body.hotelId,
      date: new Date(),
    };

    if (req.body.image) {
      obj.image = await storeFileAndReturnNameBase64(req.body.image);
    }

    // if (statusFound && statusFound.autoApprovereview == true) {
    //     obj = {
    //         message: req.body.message,
    //         rating: req.body.rating,
    //         userId: req.body.userId,
    //         hotelId: req.body.hotelId,
    //         status: generalModelStatuses.APPROVED
    //     };
    // } else {
    //     obj = {
    //         message: req.body.message,
    //         rating: req.body.rating,
    //         userId: req.body.userId,
    //         hotelId: req.body.hotelId
    //     };
    // }
    let newReview = await new review(obj).save();
    if (!newReview) throw new Error("Unable to add review");
    res
      .status(200)
      .json({ message: "Review Successfully Submitted", success: true });
  } catch (err) {
    next(err);
  }
};

export const addAdminReview = async (req, res, next) => {
  //for user
  try {
    console.log(req.body);

    if (!req.body.rating) throw new Error("rating is mandatory");
    if (!isValid(req.body.rating)) throw new Error("rating cant be empty");

    if (!req.body.message) throw new Error("message is mandatory");
    if (req.body.rating) {
      if (req.body.rating > 5 || req.body.rating < 0) {
        throw new Error(" review cant be more than 5 or negative");
      }
    }

    let obj = {};

    obj = {
      message: req.body.message,
      title: req.body.name,
      rating: req.body.rating,
      hotelId: req.body.hotelId,
      link: req.body.link,
    };

    if (req.body.date) {
      obj.date = req.body.date;
    }

    if (req.body.image) {
      obj.image = await storeFileAndReturnNameBase64(req.body.image);
    }
    // if (statusFound && statusFound.autoApprovereview == true) {
    //     obj = {
    //         message: req.body.message,
    //         rating: req.body.rating,
    //         userId: req.body.userId,
    //         hotelId: req.body.hotelId,
    //         status: generalModelStatuses.APPROVED
    //     };
    // } else {
    //     obj = {
    //         message: req.body.message,
    //         rating: req.body.rating,
    //         userId: req.body.userId,
    //         hotelId: req.body.hotelId
    //     };
    // }
    let newReview = await new review(obj).save();
    if (!newReview) throw new Error("Unable to create review");
    res
      .status(200)
      .json({ message: "Review Successfully Created", success: true });
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  //for user
  try {
    let existsCheck = await reviewModel.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Review does not exist !");
    }
    res.status(200).json({
      message: "Review  Successfully",
      data: existsCheck,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
export const getReview = async (req, res, next) => {
  //for admin
  try {
    // let validityCheck = await Users.findOne({
    //     $or: [{ _id: req.user.userId, role: "ADMIN" },
    //     { _id: req.user.userId, role: "SUBADMIN" },
    //     { _id: req.user.userId, role: "SELLER" },
    //     ]
    // }).exec();
    // if (!validityCheck) throw new Error("you are not authorise to check review");

    let query = {
      isDeleted: false,
    };

    if (req.query?.hotelId != undefined) {
      query.hotelId = req.query.hotelId;
    }
    let reviewArr = await review
      .find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    for (const el of reviewArr) {
      if (el.hotelId) {
        let hotelObj = await HotelModel.findById(el.hotelId)
          .select("_id name")
          .exec();
        el.hotelObj = hotelObj;
      }
    }
    res
      .status(200)
      .json({ message: "getReview", data: reviewArr, success: true });
  } catch (err) {
    next(err);
  }
};

export const getReviewByHotelId = async (req, res, next) => {
  //for admin
  try {
    let query = {
      isDeleted: false,
    };

    if (req.params?.id != undefined) {
      query.hotelId = req.params.id;
    }
    let reviewArr = await review
      .find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res
      .status(200)
      .json({ message: "getReview", data: reviewArr, success: true });
  } catch (err) {
    next(err);
  }
};
export const getReviewForUser = async (req, res, next) => {
  //for user
  try {
    let query = {
      isDeleted: false,
      status: generalModelStatuses.APPROVED,
    };
    let hotelId = "";
    if (req.query.hotelId) {
      query.hotelId = req.query.hotelId;
      hotelId = req.query.hotelId;
    }

    let reviewArr = await review
      .find(query)
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
      .exec();
    let pipeline = [
      {
        $match:
          /**
           * query: The query in MQL.
           */
          {
            hotelId: hotelId,
          },
      },
      {
        $group: {
          _id: "$hotelId",
          avgRating: {
            $avg: "$rating",
          },
          totalRating: {
            $sum: "$rating",
          },
          totalReview: {
            $sum: 1,
          },
        },
      },
    ];
    let reviewObj = await review.aggregate(pipeline);
    if (reviewObj && reviewObj?.length > 0) {
      reviewObj = reviewObj[0];
    } else {
      reviewObj = {};
    }
    console.log(reviewObj, "reviewObj?.length");

    for (const el of reviewArr) {
      if (el.userId) {
        let userObj = await Users.findById(el.userId).exec();
        if (userObj && userObj?._id) {
          el.name = `${userObj?.firstName ? userObj?.firstName : ""}  ${
            userObj?.lastName ? userObj?.lastName : ""
          }`;
        } else {
          el.name = el?.title ? el.title : "User";
        }
      } else {
        el.name = el?.title ? el.title : "User";
      }
    }
    res.status(200).json({
      message: "getReview",
      data: reviewArr,
      success: true,
      reviewObj: reviewObj,
    });
  } catch (err) {
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  //for user
  try {
    if (
      !req.user ||
      !req.user.role ||
      (req.user.role != "ADMIN" &&
        req.user.role != "SUBADMIN" &&
        req.user.role != "SELLER")
    )
      throw new Error("you are not authorise to update product review");

    if (req.body.image && `${req.body.image}`.includes("data:image")) {
      req.body.image = await storeFileAndReturnNameBase64(req.body.image);
    }
    let userFound = await review
      .findOne({ _id: req.params.id, isDeleted: false })
      .lean()
      .exec();
    if (!userFound) throw new Error("review not found or deleted");
    await review.findByIdAndUpdate(req.params.id, req.body).exec();

    res.status(200).json({ message: "review Updated", success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  //for admin ,subadmin  ,seller
  try {
    if (
      !req.user ||
      !req.user.role ||
      (req.user.role != "ADMIN" && req.user.role != "SUBADMIN")
    )
      throw new Error("you are not authorise to delete product review");

    let productObj = await review
      .findOne({ _id: req.params.id, isDeleted: false })
      .exec();
    console.log(productObj, "productObj");
    if (!productObj) throw new Error("product not found or deleted already");

    await review.findByIdAndDelete(productObj._id).exec();
    res
      .status(200)
      .json({ msg: "product deleted successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const updatereview = async (req, res, next) => {
  //for admin,subadmin
  try {
    if (
      !req.user ||
      !req.user.role ||
      (req.user.role != "ADMIN" &&
        req.user.role != "SUBADMIN" &&
        req.user.role != "SELLER")
    )
      throw new Error("you are not authorise to update product review");

    let userFound = await review
      .findOne({ _id: req.params.id, isDeleted: false })
      .lean()
      .exec();
    if (!userFound) throw new Error("review not found or deleted");
    await review.findByIdAndUpdate(req.params.id, req.body).exec();

    res.status(200).json({ message: "review Updated", success: true });
  } catch (err) {
    next(err);
  }
};
