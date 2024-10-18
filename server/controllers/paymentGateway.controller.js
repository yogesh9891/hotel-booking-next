import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import paymentGateway from "../models/paymentGateway.model";

import Users from "../models/user.model";

export const addPaymentGateway = async (req, res, next) => {
  try {
    let validityCheck = await Users.findOne({
      $or: [
        { _id: req.user.userId, role: "ADMIN" },
        { _id: req.user.userId, role: "SUBADMIN" },
      ],
    }).exec();
    if (!validityCheck)
      throw new Error("you are not authorise to add Payment Gateway");
    if (req.body.image) {
      req.body.GatewayLogo = await storeFileAndReturnNameBase64(req.body.image);
    }
    let msg = "add";

    // console.log(req.body, "req.body");
    let exist = await paymentGateway
      .findOne({ paymentType: req.body.paymentType })
      .exec();

    if (exist) {
      // console.log(exist, "exis");
      await paymentGateway
        .findOneAndUpdate({ paymentType: req.body.paymentType }, req.body, {
          new: true,
        })
        .exec();
      msg = "update";
    }
    else {
      await paymentGateway(req.body).save();
    }
   
    res
      .status(201)
      .json({ message: `Payment Gateway ${msg} successfully`, success: true });
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const get = await paymentGateway.find().exec();
    // console.log(get, "pp");
    res
      .status(200)
      .json({ message: "get Payment gateway", data: get, success: true });
  } catch (err) {
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  try {
    let validityCheck = await Users.findOne({
      $or: [
        { _id: req.user.userId, role: "ADMIN" },
        { _id: req.user.userId, role: "SUBADMIN" },
      ],
    }).exec();
    if (!validityCheck)
      throw new Error("you are not authorise to update Payment Gateway");
    if (req.body.image) {
      req.body.GatewayLogo = await storeFileAndReturnNameBase64(req.body.image);
    }
    await paymentGateway
      .findOneAndUpdate(req.params.id, req.body, { new: true })
      .exec();
    res.status(200).json({ message: "Payment Gateway Updated", success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    let validityCheck = await Users.findOne({
      $or: [
        { _id: req.user.userId, role: "ADMIN" },
        { _id: req.user.userId, role: "SUBADMIN" },
      ],
    }).exec();
    if (!validityCheck)
      throw new Error("you are not authorise to delete Payment Gateway");
    const obj = await paymentGateway.findByIdAndDelete(req.params.id).exec();
    if (!obj) throw { status: 400, message: "Payment Gateway Not Found" };
    res.status(200).json({ message: "Payment Gateway Deleted", success: true });
  } catch (err) {
    next(err);
  }
};
