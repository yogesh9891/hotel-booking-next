import { comparePassword, encryptPassword } from "../helpers/Bcrypt";
import { ErrorMessages, rolesObj } from "../helpers/Constants";
import { generateAccessJwt, generateRefreshJwt } from "../helpers/Jwt";
import { sendOtp, verifyOtp } from "../helpers/Otp";
import { generateRandomNumber } from "../helpers/utils";
import otpModel from "../models/otp.model";
import Users from "../models/user.model";

export const registerUser = async (req, res, next) => {
  try {
    let UserExistCheck = await Users.findOne({
      $or: [
        { phone: req.body.phone },
        { email: new RegExp(`^${req.body.email}$`) },
      ],
    }).exec();
    console.log(req.body);
    if (UserExistCheck)
      throw new Error(
        `${ErrorMessages.EMAIL_EXISTS} or ${ErrorMessages.PHONE_EXISTS}`
      );
    // if (!ValidateEmail(req.body.email)) {
    //   throw new Error(ErrorMessages.INVALID_EMAIL);
    // }
    // if (!validNo.test(req.body.phone)) throw { status: false, message: `Please fill a valid phone number` };
if(req.body?.password ){
  req.body.password = await encryptPassword(req.body.password);
}
    let obj = {
      role: req.body.role ? req.body.role : rolesObj.USER,
      email: req.body.email,
      password: req.body?.password,
      phone: req.body.phone,
      name: req.body.name,
      isActive: true,
    };
    let userObj = await new Users(obj).save();
    if (req.body.permissionsArr) {
      let permissionObj = await new Permission({
        userId: userObj._id,
        permissionsArr: req.body.permissionsArr,
      }).save();
      await Users.findByIdAndUpdate(userObj._id, {
        permission: permissionObj._id,
      }).exec();
    }

    res.status(200).json({ message: "Register Successfully", success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const userObj = await Users.findOne({
      email: new RegExp(`^${req.body.email}$`),
    })
      .lean()
      .exec();
    if (userObj) {
      const passwordCheck = await comparePassword(
        userObj.password,
        req.body.password
      );
      if (passwordCheck) {
        let accessToken = await generateAccessJwt({
          userId: userObj._id,
          role: rolesObj.USER,
          name: userObj.name,
          phone: userObj.phone,
          email: userObj.email,
        });
        res.status(200).json({
          message: "LogIn Successfull",
          token: accessToken,
          success: true,
        });
      } else {
        throw { status: 401, message: "Invalid Password" };
      }
    } else {
      throw { status: 401, message: "User Not Found ! Please SignUp" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  // for adim only
  try {
    let obj = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
    };

    if (req.body.image) {
      if (obj.image != "") {
        obj.image = await storeFileAndReturnNameBase64(req.body.image);
      }
    }
    let userExistObj = await Users.findById(req.user.userId).lean().exec();
    if (!userExistObj) throw new Error("Invalid User");
    if (obj.email) {
      let userPhone = await Users.findOne({
        phone: obj.email,
        _id: { $nin: [req.user.userId] },
      })
        .lean()
        .exec();
      if (userPhone) throw new Error("Email Already registerd");
    }

    userExistObj = await Users.findOneAndUpdate({ _id: req.user.userId }, obj);
    res.status(200).json({
      message: "Updated Successfully",
      success: true,
      data: userExistObj,
    });
  } catch (err) {
    next(err);
  }
};
//   // for adim only
//   try {
//     // let adminCheck = await Users.findOne({
//     //     $or: [
//     //         { _id: req.user.userId, role: "ADMIN" },
//     //         { _id: req.user.userId, role: "SUBADMIN" },
//     //     ],
//     // }).exec();

//     // console.log(req.user, "user");
//     if (!req.user || !req.user.role || (req.user.role != "ADMIN" && req.user.role != "SELLER" && req.user.role != "SUBADMIN")) throw new Error("you are not authorise to update user");

//     let userExistsObj = await Users.findById(req.params.id).exec();
//     if (!userExistsObj) {
//       throw new Error("User Not found");
//     }
//     if (!ValidateEmail(req.body.email)) {
//       throw new Error(ErrorMessages.INVALID_EMAIL);
//     }
//     if (!validNo.test(req.body.phone)) throw { status: false, message: `Please fill a valid phone number` };

//     req.body.password = await encryptPassword(req.body.password);
//     let obj = {
//       role: req.body.role,
//       email: req.body.email,
//       password: req.body.password,
//       phone: req.body.phone,
//       name: req.body.name,
//     };
//     if (req.body.role == rolesObj.SELLER) {
//       obj.natureofBusiness = req.body.natureofBusiness;
//       obj.natureOfBusinessOther = req.body.natureOfBusinessOther;
//       obj.otherBusinessType = req.body.otherBusinessType;
//       obj.businessType = req.body.businessType;
//       obj.correspondanceAddress = req.body.correspondanceAddress;
//       obj.correspondanceAddressLandmark = req.body.correspondanceAddressLandmark;
//       obj.sellerCategoryId = req.body.sellerCategoryId;
//       obj.workingUnitAddress = req.body.workingUnitAddress;
//       obj.workingUnitLandmark = req.body.workingUnitLandmark;
//       obj.pickupAndDropAddress = req.body.pickupAndDropAddress;
//       obj.pickupAndDropOtherAddress = req.body.pickupAndDropOtherAddress;
//       obj.pickupAndDropOtherLandmark = req.body.pickupAndDropOtherLandmark;
//       obj.GSTN = req.body.GSTN;
//       obj.BusinessScale = req.body.BusinessScale;
//       obj.certifications = req.body.certifications;
//       obj.turnover = req.body.turnover;
//       obj.CIN = req.body.CIN;
//       obj.PAN = req.body.PAN;
//       obj.Aadhaar = req.body.Aadhaar;
//       obj.nameOfAuthorisedSignatory = req.body.nameOfAuthorisedSignatory;
//       obj.authorisedSignatoryAddress = req.body.authorisedSignatoryAddress;
//       obj.authorisedSignatoryContact = req.body.authorisedSignatoryContact;
//       obj.businessCommencementDate = req.body.businessCommencementDate;
//       obj.awardsAndRecognitions = req.body.awardsAndRecognitions;
//       obj.qualityComplianceAndCertificates = req.body.qualityComplianceAndCertificates;
//       obj.monthlyProductionCapacity = req.body.monthlyProductionCapacity;
//       obj.uploadProcessingVideos = req.body.uploadProcessingVideos;
//       obj.workingUnitpics = req.body.workingUnitpics;
//       obj.monthlyProductionCapacity = req.body.monthlyProductionCapacity;
//       obj.uploadProcessingVideos = req.body.uploadProcessingVideos;
//       obj.accountNo = req.body.accountNo;
//       obj.accountHolderName = req.body.accountHolderName;
//       obj.ifscCode = req.body.ifscCode;
//       obj.swiftCode = req.body.swiftCode;
//       obj.bankName = req.body.bankName;
//       obj.otherMarketPlaceUrl = req.body.otherMarketPlaceUrl;
//       obj.facebook = req.body.facebook;
//       obj.instagram = req.body.instagram;
//       obj.twitter = req.body.twitter;
//       obj.linkedIn = req.body.linkedIn;
//       obj.otherLink = req.body.otherLink;
//       obj.websiteUrl = req.body.websiteUrl;
//     }
//     if (req.body.copyOfCancelledCheque && `${req.body.copyOfCancelledCheque}`.includes("base64")) {
//       obj.copyOfCancelledCheque = await storeFileAndReturnNameBase64(req.body.copyOfCancelledCheque);
//     }
//     if (req.body.workingUnitpics && `${req.body.workingUnitpics}`.includes("base64")) {
//       obj.workingUnitpics = await storeFileAndReturnNameBase64(req.body.workingUnitpics);
//     }

//     await Users.findByIdAndUpdate(req.params.id, obj).exec();

//     if (req.body.permissionsArr) {
//       let userPermissionExistsCheck = await Permission.findOne({ userId: req.params.id }).exec();
//       console.log(userPermissionExistsCheck, "userPermissionExistsCheck");
//       if (userPermissionExistsCheck) {
//         let permissionObj = await Permission.findOneAndUpdate({ userId: req.params.id }, { permissionsArr: req.body.permissionsArr }).exec();
//         await Users.findByIdAndUpdate(req.params.id, { permission: permissionObj._id }).exec();
//       } else {
//         console.log("userPermissionExistsCheck");
//         let permissionObj = await new Permission({ userId: req.params.id, permissionsArr: req.body.permissionsArr }).save();
//         await Users.findByIdAndUpdate(req.params.id, { permission: permissionObj._id }).exec();
//       }
//     }
//     console.log(JSON.stringify(req.body, null, 2));

//     res.status(201).json({ message: "User Updated Successfully", success: true });
//   } catch (err) {
//     next(err);
//   // export const updateUserById = async (req, res, next) => {
// }
// };

// export const getUsers = async (req, res, next) => {
//   //for admin & subadmin can see
//   try {
//     if (!req.user || !req.user.role || (req.user.role != "ADMIN" && req.user.role != "SUBADMIN")) throw new Error("you are not authorise to view user");
//     let UsersArr = [];
//     if (req.query.role) {
//       UsersArr = await Users.find({ role: req.query.role }).lean().exec();
//     } else {
//       UsersArr = await Users.find({ $and: [{ role: { $ne: rolesObj.ADMIN } }, { role: { $ne: req.user.role } }] })
//         .lean()
//         .exec();
//     }

//     // const UsersPipeline = UserList(req.query);
//     // // console.log(UsersPipeline);
//     // const UsersArr = await Users.aggregate(UsersPipeline);
//     // console.log(UsersArr);
//     res.status(200).json({ message: "Users", data: UsersArr, success: true });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };

export const getUserById = async (req, res, next) => {
  //for admin & subadmin can see
  try {
    // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to view user");

    let UsersObj = await Users.findById(req.params.id).lean().exec();
    if (!UsersObj) {
      throw new Error("Could not find user");
    }

    if (UsersObj.role == rolesObj.SUBADMIN) {
      let permissionsObj = await Permission.findById(
        UsersObj.permission
      ).exec();
      UsersObj.permissionsObj = permissionsObj;
    }
    res.status(200).json({ message: "Users", data: UsersObj, success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// export const deleteUser = async (req, res, next) => {
//   try {
//     // let adminCheck = await Users.findOne({
//     //     $or: [
//     //         { _id: req.user.userId, role: "ADMIN" },
//     //         { _id: req.user.userId, role: "SUBADMIN" },
//     //         { _id: req.user.userId, role: "USER" },
//     //     ],
//     // }).exec();

//     if (!req.user || !req.user.role || (req.user.role != "ADMIN" && req.user.role != "SUBADMIN")) throw new Error("you are not authorise to delete user");

//     let userObj = await Users.findOne({ _id: req.params.id, isDeleted: false }).exec();
//     // console.log(userObj, "userObj")
//     if (!userObj) throw { status: 400, message: "user not found or deleted already" };

//     await Users.findByIdAndUpdate(req.params.id, { $set: { isDeleted: true } }).exec();

//     res.status(200).json({ msg: "user deleted successfully", success: true });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };

export const registerAdmin = async (req, res, next) => {
  try {
    let adminExistCheck = await Users.findOne({
      $or: [
        { phone: req.body.phone },
        { email: new RegExp(`^${req.body.email}$`) },
      ],
    })
      .lean()
      .exec();
    if (adminExistCheck)
      throw new Error(
        `${ErrorMessages.EMAIL_EXISTS} or ${ErrorMessages.PHONE_EXISTS}`
      );
    // if (!ValidateEmail(req.body.email)) {
    //   throw new Error(ErrorMessages.INVALID_EMAIL);
    // }

    req.body.password = await encryptPassword(req.body.password);

    let newUser = await new Users(req.body).save();

    res.status(200).json({ message: "admin Created", success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    console.log(req.body);
    const adminObj = await Users.findOne({
      email: new RegExp(`^${req.body.email}$`),
    })
      .lean()
      .exec();
    if (adminObj) {
      const passwordCheck = await comparePassword(
        adminObj.password,
        req.body.password
      );
      if (passwordCheck) {
        let accessToken = await generateAccessJwt({
          userId: adminObj._id,
          role: adminObj.role,
          user: {
            name: adminObj.name,
            email: adminObj.email,
            phone: adminObj.phone,
            _id: adminObj._id,
          },
        });
        res.status(200).json({
          message: "LogIn asd Successfull",
          token: accessToken,
          success: true,
        });
      } else {
        throw { status: 401, message: "Invalid Password" };
      }
    } else {
      throw { status: 401, message: "Admin Not Found" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const sendOtpApi = async (req, res, next) => {
  try {

    
    if (!req.body.phone || req.body.phone.length != 10) {
      throw new Error("Invalid Mobile Number");
    }
        let otp = generateRandomNumber(6);
        if (req.body.phone && req.body.phone != "") {
          const otpPayload = {
            phone: req.body.phone,
            otp,
          };
          const otpBody = await otpModel.create(otpPayload);
        }

  res
    .status(200)
    .json({
      message: "OTP send to your mobile " + req.body.phone,
      status: true,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const verifyOtpApi = async (req, res, next) => {
  try {
    if (!req.body.phone && req.body.phone.length != 10) {
      throw new Error("Invalid Mobile Number");
    }

    if (!req.body.otp) {
      throw new Error("Please Fill Otp");
    }
    let phone = req.body.phone;
    let otp = req.body.otp;

      const response = await otpModel
        .find({ phone })
        .sort({ createdAt: -1 })
        .limit(1);
      if (response.length === 0 || otp !== response[0].otp) {
        console.log(response, "responseresponseresponse");

        throw new Error("Invalid OTP");
      }
    let isActive = false
    const userObj = await Users.findOne({
      phone: new RegExp(`^${req.body.phone}$`),
    })
      .lean()
      .exec();
    if (userObj) {
      isActive = true;
    }

    res
      .status(200)
      .json({ status: true, message: "OTP Matched Successfully", isActive });

    res.status(200).json(otpResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    // console.log(req.body);

    if (!req.body?.email) {
      throw { status: 401, message: "" };
    }
    const userObj = await Users.findOne({
      email: new RegExp(`^${req.body.email}$`),
    })
      .lean()
      .exec();
    if (!userObj) {
      throw { status: 401, message: "user Not Found" };
    }

    if (!verifyRefreshTokenJwt(req.body.email, req.body.refresh)) {
      throw { status: 401, message: "Refresh Token is not matched" };
    }
    let accessToken = await generateAccessJwt({
      userId: userObj._id,
      role: rolesObj.USER,
      name: userObj.name,
      phone: userObj.phone,
      email: userObj.email,
    });
    let refreshToken = await generateRefreshJwt({
      userId: userObj._id,
      role: rolesObj.USER,
      name: userObj.name,
      phone: userObj.phone,
      email: userObj.email,
    });
    res.status(200).json({
      message: "Refresh Token",
      token: accessToken,
      refreshToken,
      success: true,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const otpLogin = async (req, res, next) => {
  try {
    console.log(req.body, "asfhsadjfhdsfsadhfsdfsd------------");
    const userObj = await Users.findOne({
      phone: new RegExp(`^${req.body.phone}$`),
    })
      .lean()
      .exec();
    if (userObj) {
      let user = {
        name: userObj.name,
        email: userObj.email ? userObj.email : "",
        phone: userObj.phone,
        role: userObj.role,
        _id: userObj._id,
        accessObj: userObj.accessObj,
      };

      const token = await generateAccessJwt({
        userId: userObj._id,
        role: userObj.role,
        user,
      });
      const refreshToken = await generateRefreshJwt({
        userId: userObj._id,
        role: userObj.role,
        user,
      });

      res
        .status(200)
        .json({ message: "LogIn Successfully", token, user, refreshToken });
    } else {
      let obj = {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
      };

      let userObjCreated = await new Users(obj).save();

      let user = {
        name: userObjCreated.name,
        email: userObjCreated.email,
        phone: userObjCreated.phone,
        role: userObjCreated.role,
        _id: userObjCreated._id,
        accessObj: userObjCreated.accessObj,
      };

      const token = await generateAccessJwt({
        userId: userObjCreated._id,
        role: userObjCreated.role,
        user,
      });
      const refreshToken = await generateRefreshJwt({
        userId: userObjCreated._id,
        role: userObjCreated.role,
        user,
      });

      res
        .status(200)
        .json({ message: "LogIn Successfully", token, user, refreshToken });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
