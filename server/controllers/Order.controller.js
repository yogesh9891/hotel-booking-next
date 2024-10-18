import {
  OrderStatus,
  OrderType,
  getOrderIdSequence,
} from "../helpers/OrderStatus";
import { createPaymentOrder } from "../helpers/razorpay";
import Order from "../models/order.model";
import HotelModel from "../models/Hotel.model";
import Category from "../models/category.model";
import Users from "../models/user.model";
import { sendMail } from "../helpers/nodemailer";
import { generalModelStatuses } from "../helpers/Constants";
import RoomModel from "../models/Room.model";
import Coupon from "../models/Coupon.model";
import RoomAvailableModel from "../models/RoomAvailable.model";
import {
  checkStatusPhonePaymentOrder,
  createPhonePaymentOrder,
} from "../helpers/phonepe";
import {
  addGuestRmsApi,
  cancelReservationById,
  createReceiptRmsApi,
  createReservationGroupRmsApi,
  createReservationRmsApi,
  rmsrmsAuthLogin,
} from "../services/rmsapi";
import { sendBooking } from "../helpers/Otp";
import moment from "moment";
// import { discountType } from "../helpers/Constants";
// import { createInvoice } from "../helpers/generateInvoice";

export const createOrder = async (req, res, next) => {
  try {
    const userObj = await User.findById(req.user.userId).lean().exec();
    if (!userObj) throw new Error("User Not Found");

    let userCartObj = await UserCart.findOne({ userId: req.user.userId })
      .lean()
      .exec();
    let currencyObj = userCartObj?.currencyObj;

    if (userCartObj.items.length <= 0) {
      throw new Error("Your Cart is empty");
    }
    for (let el of userCartObj.items) {
      let hotelObj = await HotelModel.findById(el.productId).lean().exec();
      if (!hotelObj) {
        throw new Error(`HotelModel Not Found Please empty your cart`);
      }
      el.price = hotelObj?.mrp;
      el.convertedPrice = parseFloat(
        (hotelObj?.mrp * currencyObj?.convertRate).toFixed(2)
      );
      let tempGst = hotelObj?.gst;
      let tempHalfGst = tempGst / 2;
      el.cgst = parseFloat((el.price * (tempHalfGst / 100)).toFixed(2));
      el.sgst = parseFloat((el.price * (tempHalfGst / 100)).toFixed(2));
      el.igst = parseFloat((el.price * (tempGst / 100)).toFixed(2));
      el.name = hotelObj?.name;
      el.image = hotelObj?.imageArr[0]?.image;
      el.sku = hotelObj?.sku;
      el.productImage = hotelObj?.productImage;
      el.totalPrice = parseInt((el.price + el.cgst + el.sgst) * el.quantity);
      el.convertedTotalPrice = parseInt(
        el.totalPrice * currencyObj?.convertRate
      );

      let stockup = parseInt(el.quantity);

      if (el.variantobj && el.variantobj != "" && el.variantobj.name) {
        let variantId = el.variantobj?._id;
        let variaStock = parseInt(el.variantobj.currentStock - stockup);
        // console.log(variaStock,"variantobjvariaStockvariaStock",el.variantobj)

        let update = await HotelModel.findOneAndUpdate(
          { "attributesArr._id": variantId },
          { $set: { "attributesArr.$.currentStock": +variaStock } },
          { new: true }
        ).exec();
      } else {
        let update = await HotelModel.findOneAndUpdate(
          { _id: el.productId },
          { $inc: { stock: -stockup } },
          { new: true }
        ).exec();
        // console.log(update,"updateupdateupdateupdateupdateupdateupdateupdateupdate")
      }
    }
    let subTotalAmount = userCartObj.items.reduce(
      (acc, el) => acc + el.price * el.quantity,
      0
    );
    let subConvertedTotalAmount = parseFloat(
      (subTotalAmount * currencyObj?.convertRate).toFixed(2)
    );

    ///tax calculation
    let totalAmount = userCartObj.items.reduce(
      (acc, el) => acc + (el.price + el.cgst + el.sgst) * el.quantity,
      0
    );
    totalAmount = parseInt(totalAmount);

    let dicountObj = null;
    // console.log(totalAmount,"totalAmount")
    if (userCartObj.dicountObj && userCartObj.dicountObj?.amount) {
      totalAmount =
        parseInt(totalAmount) - parseInt(userCartObj.dicountObj.amount);
      // console.log(totalAmount," dicountObj totalAmount")
      dicountObj = userCartObj.dicountObj;
    }
    console.log(totalAmount, "dicountObjdicountObj", userCartObj._id);

    let shippingCharges = 0;

    if (userCartObj.shipping && userCartObj.shipping != "0") {
      totalAmount = parseInt(totalAmount) + parseInt(userCartObj.shipping);
      shippingCharges = userCartObj.shipping;
    }
    let convertedTotalAmount = totalAmount;
    let amount = totalAmount * 100;
    let currency = "INR";
    if (currencyObj?.code && currencyObj?.convertRate) {
      convertedTotalAmount = Math.round(
        parseInt(totalAmount) * parseFloat(currencyObj?.convertRate)
      );
      console.log(totalAmount, parseFloat(currencyObj?.convertRate));

      amount = convertedTotalAmount * 100;
      currency = currencyObj.code;

      if (currency.length >= 4) {
        currency = currency.substring(0, currency.length - 1);
      }
    }
    let obj = {
      userId: req.user.userId,
      currencyObj: currencyObj,
      addressObj: userCartObj.addressObj,
      productsArr: userCartObj.items,
      subTotalAmount,
      subConvertedTotalAmount,
      totalAmount,
      convertedTotalAmount,
      active: true,
      dicountObj,
      shippingCharges,
      orderType: OrderType.ONLINE,
    };
    // console.log(obj,"order.items")
    if (userCartObj.addressObj?.orderNotes) {
      obj.orderNotes = userCartObj.addressObj.orderNotes;
    }

    console.log(
      currency,
      "currencyObjcurrencyObjcurrencyObj",
      convertedTotalAmount,
      amount
    );

    let orderObj = await new Order(obj).save();
    let options = {
      amount: amount,
      currency: currency,
      receipt: new Date().getTime(),
    };

    let orderPaymentObj = await createPaymentOrder(options);

    let obj1 = await Order.findByIdAndUpdate(orderObj._id, {
      "paymentObj.gatwayPaymentObj": orderPaymentObj,
    })
      .lean()
      .exec();
    let obj2 = await UserCart.findOneAndUpdate(
      { userId: `${req.user.userId}` },
      { dicountObj: {} }
    ).exec();

    res.status(200).json({
      message: "Order Created",
      data: orderPaymentObj,
      orderId: orderObj._id,
      success: true,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createGuestOrder = async (req, res, next) => {
  try {
    // console.log(userCartObj,"|userCartObjuserCartObj")

    if (!req.body.hotelId) {
      throw new Error("Please Select Properties");
    }

    let areaId = "";
    let userData = {
      hotelId: req.body.hotelId,
    };
    let rmsPropertyId = "";
    let roomsArr = [];
    if (req.body.hotelId) {
      let hotelObj = await HotelModel.findById(req.body.hotelId).lean().exec();
      if (!hotelObj) {
        throw new Error(`Properties Not Found`);
      }
      userData.name = hotelObj.name;
      areaId = hotelObj.areaId;

      rmsPropertyId = hotelObj?.rmsPropertyId;
      userData.image = hotelObj.mainImage;
      userData.price = req.body.subtotalPrice;

      if (req?.body?.roomsArr && req?.body?.roomsArr?.length) {
        for (const room of req?.body?.roomsArr) {
          console.log(room, "roomroomroomroom");
          let roomObj = await RoomModel.findById(room.roomId).lean().exec();

          if (roomObj) {
            let roomBookObj = {
              name: roomObj.name,
              price: roomObj.price,
              hotelId: roomObj.hotelId,
              roomId: roomObj.roomId,
              room: room.room,
              image: roomObj.mainImage,
              guest: roomObj?.guest,
              areaId: roomObj.areaId,
              rateId: room.rateId,
              rmsPropertyId: roomObj?.rmsPropertyId,
            };

            roomsArr.push(roomBookObj);
          }
        }
      }

      // let tempGst = hotelObj?.gst;
      // let tempHalfGst = tempGst / 2;
      // el.cgst = parseFloat((el.price * (tempHalfGst / 100)).toFixed(2));
      // el.sgst = parseFloat((el.price * (tempHalfGst / 100)).toFixed(2));
      // el.igst = parseFloat((el.price * (tempGst / 100)).toFixed(2));
      // el.name = hotelObj?.name;
    }
    let subTotalAmount = req.body.subtotalPrice;
    let totalAmount = req.body.subtotalPrice;

    ///tax calculation
    // totalAmount = parseInt(totalAmount);
    let dicountObj = {};
    let offerObj = {};
    // console.log(totalAmount,"totalAmount")
    if (req.body.discount && req.body.discount?.code) {
      let discoutObj = req.body.discount;
      // console.log(totalAmount," dicountObj totalAmount")
      dicountObj.amount = discoutObj.amount;
      dicountObj.code = discoutObj.code;
    }
    if (req.body.offer && req.body.offerPrice) {
      // console.log(totalAmount," dicountObj totalAmount")
      offerObj.amount = req.body.offerPrice;
      offerObj.code = req.body.offer;
    }

    // console.log(totalAmount,"totalAmount")
    let gst = req.body.gst;
    if (gst) {
      totalAmount = totalAmount + gst.amount;
    }
    let userId = req.body.userId ? req.body.userId : "";
    let guestArr = req.body.guestArr;
    let obj = {
      hotelsArr: roomsArr?.length > 0 ? roomsArr : [userData],
      hotelId: req.body.hotelId,
      guestArr: guestArr,
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      adult: req.body.adult,
      child: req.body.child,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      nights: req.body.nights,
      gst: req.body.gst,
      subTotalAmount,
      totalAmount,
      rmsPropertyId,
      userId,
      active: true,
      dicountObj,
      offerObj,
    };

    console.log(obj, "objobjobjobjobjobj");

    let orderObj = await new Order(obj).save();

    let guestId = "";
    if (orderObj && orderObj?._id) {
      console.log(orderObj, "orderObjorderObjorderObjorderObjorderObj");

      guestId = await addGuestRmsApi(orderObj);
      if (guestId) {
        orderObj.guestId = guestId;
        orderObj.areaId = areaId;
        orderObj.baseRateOverride = Math.round(totalAmount / orderObj.nights);
        orderObj.totalRateOverride = totalAmount;
        if (roomsArr && roomsArr?.length > 1) {
          let resevObj = await createReservationGroupRmsApi(orderObj);

          console.log("createReservationGroupRmsApi => ", resevObj);
          if (resevObj && resevObj?.length > 0) {
            for (const resd of resevObj) {
              await Order.findOneAndUpdate(
                {
                  _id: `${orderObj?._id}`,
                  "hotelsArr.rmsPropertyId": resd.rmsPropertyId,
                },
                {
                  $set: {
                    "hotelsArr.$.accountId": resd.accountId,
                    "hotelsArr.$.reservationId": resd.id,
                  },
                }
              );
            }
          } else {
            throw new Error(`Try Again After Some Time`);
          }
        } else {
          let resevObj = await createReservationRmsApi(orderObj);

          console.log("createReservationRmsApi => ", resevObj);
          if (resevObj.accountId && resevObj.id) {
            await Order.findByIdAndUpdate(orderObj._id, {
              accountId: resevObj.accountId,
              reservationId: resevObj.id,
              guestId,
            });
          } else {
            throw new Error(`Try Again After Some Time`);
          }
        }
      }
    }

    let options = {
      amount: obj.totalAmount * 100,
      currency: "INR",
      receipt: new Date().getTime(),
    };
    let orderPaymentObj = {};
    if (req.body?.paymentMethod && req.body.paymentMethod == "phonepe") {
      options.orderId = orderObj._id;
      options.mobile = req.body.mobile;
      let phoResone = await createPhonePaymentOrder(options);
      if (phoResone && !phoResone?.sucess) {
        throw new Error(
          `Phonepe is not working.Please Try Some another Payment Method`
        );
      }
      orderPaymentObj = phoResone?.data;
    } else {
      orderPaymentObj = await createPaymentOrder(options);
    }

    await Order.findByIdAndUpdate(orderObj._id, {
      "paymentObj.gatwayPaymentObj": orderPaymentObj,
    })
      .lean()
      .exec();

    res.status(200).json({
      message: "Order Created",
      data: orderPaymentObj,
      orderId: orderObj._id,
      success: true,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const paymentCallback = async (req, res, next) => {
  try {
    /**
     *
     *  if there is no payment id throw error
     *
     */

    // send all details in the req.query
    // console.log(req.params, req.query);
    console.log(req.user, "=================================");
    console.log(
      "22222222222222342342222222222222222222222userObjuserObjuserObjuserObjuserObj"
    );
    // const userObj = await User.findById(req.user.userId).lean().exec();
    let tempOrderObj = await Order.findById(req.params.orderId).exec();
    if (!tempOrderObj) throw new Error("Order Not Found");

    let orderObj = await Order.findByIdAndUpdate(req.params.orderId, {
      "paymentObj.paymentChk": 1,
      $push: { "paymentObj.gatewayPaymentArr": req.query },
      active: true,
      orderStatus: "CONFIRMED",
    })
      .lean()
      .exec();
    console.log(
      tempOrderObj?.addressObj?.email,
      "tempOrderObjtempOrderObjtempOrderObjtempOrderObj"
    );
    console.log(orderObj, "orderObjorderObjorderObjorderObj");

    let obj3 = { ...orderObj };
    if (orderObj.startDate && orderObj.endDate) {
      let query = {};
      if (orderObj.startDate) {
        query.availableDate = {
          $gte: new Date(orderObj.startDate),
        };
      }
      if (orderObj.endDate) {
        query.availableDate = {
          ...query.availableDate,
          $lte: new Date(orderObj.endDate),
        };
      }
      if (orderObj.hotelId) {
        query = { ...query, hotelId: orderObj.hotelId };
        let hotelObj = await HotelModel.findById(orderObj.hotelId)
          .lean()
          .exec();
        obj3.hotelName = hotelObj.name;
        obj3.hotelImage = "/api/uploads/" + hotelObj.mainImage;
      }
      if (orderObj && orderObj?.hotelsArr && orderObj?.hotelsArr?.length > 1) {
        for (const romm of orderObj?.hotelsArr) {
          if (romm?.accountId) {
            orderObj.accountId = romm?.accountId;
            let roomObj = await createReceiptRmsApi(orderObj);
            if (roomObj) {
              await Order.findOneAndUpdate(
                {
                  _id: `${orderObj?._id}`,
                  "hotelsArr.accountId": romm.accountId,
                },
                {
                  $set: {
                    "hotelsArr.$.receiptId": roomObj,
                  },
                }
              );
            }
          }
        }
      } else {
        if (orderObj?.accountId) {
          let roomObj = await createReceiptRmsApi(orderObj);
          if (roomObj) {
            let orderObj = await Order.findByIdAndUpdate(req.params.orderId, {
              receiptId: roomObj,
            })
              .lean()
              .exec();
          }
        }
      }
    }

    // let emailArr=[orderObj?.addressObj?.email]
    let title = "Booking has been confirmed";

    let emailArr = [orderObj.email, "hello@wabisabistays.com"];
    let customerTitle = `Booking has been confirmed #${orderObj._id}`;
    let adminTitle = `New Booking #${orderObj?._id} -  ${orderObj.name}`;

    obj3.createdAtDate2 = new Date(orderObj.createdAt).toDateString();
    obj3.checkin = new Date(orderObj.startDate).toDateString();
    obj3.checkout = new Date(orderObj.endDate).toDateString();
    obj3.dicountObj = orderObj.dicountObj ? orderObj.dicountObj : false;
    obj3.offerObj = orderObj.offerObj ? orderObj.offerObj : false;
    await sendMail(emailArr, customerTitle, obj3, true, "", false);
    let emailAr2 = ["naman@wabisabistays.com"];
    await sendMail(emailAr2, adminTitle, obj3, true, "", false);

    // Send Booking SMS

    let hotelName = orderObj?.hotelsArr[0]?.name;
    let date = `${obj3.checkin} to ${obj3.checkout}`;
      await sendBooking(orderObj?.mobile, orderObj?.name, hotelName, date);




    res.json({
      message: "Payment Successfull",
      success: true,
      orderId: orderObj._id,
      data: orderObj,
    });
  } catch (err) {
    next(err);
  }
};

export const phonepePaymentStatusCheck = async (req, res, next) => {
  try {
    /**
     *
     *  if there is no payment id throw error
     *
     */

    // send all details in the req.query
    // console.log(req.params, req.query);
    console.log(req.user, "=================================");
    console.log(
      "22222222222222342342222222222222222222222userObjuserObjuserObjuserObjuserObj"
    );
    // const userObj = await User.findById(req.user.userId).lean().exec();
    let orderObj = await Order.findById(req.params.orderId).exec();
    if (!orderObj) throw new Error("Order Not Found");
    // if(orderObj?.orderStatus == 'CONFIRMED'){
    //   throw new Error("Booking is already Done");
    // }
    let phoneObj = orderObj?.paymentObj?.gatwayPaymentObj;
    let options = {
      merchantId: phoneObj?.merchantId,
      merchantTransactionId: phoneObj?.merchantTransactionId,
    };
    let checkPaymentStatus = await checkStatusPhonePaymentOrder(options);
    if (checkPaymentStatus && !checkPaymentStatus?.sucess) {
      throw new Error("Please Contact to Admin for payment is failed");
    }

    phoneObj.paymentInstrument = checkPaymentStatus?.data?.paymentInstrument;
    orderObj = await Order.findByIdAndUpdate(req.params.orderId, {
      "paymentObj.paymentChk": 1,
      "paymentObj.gatwayPaymentObj": phoneObj,
      active: true,
      orderStatus: "CONFIRMED",
    })
      .lean()
      .exec();

    console.log(
      orderObj,
      "getgetgetgetgetgetgetget=============================================="
    );
    let obj3 = { ...orderObj };
    if (orderObj.startDate && orderObj.endDate) {
      let query = {};
      if (orderObj.startDate) {
        query.availableDate = {
          $gte: new Date(orderObj.startDate),
        };
      }
      if (orderObj.endDate) {
        query.availableDate = {
          ...query.availableDate,
          $lte: new Date(orderObj.endDate),
        };
      }
      if (orderObj.hotelId) {
        query = { ...query, hotelId: orderObj.hotelId };
        let hotelObj = await HotelModel.findById(orderObj.hotelId)
          .lean()
          .exec();
        obj3.hotelName = hotelObj.name;

        if (orderObj?.roomId) {
          let hotelObj = await RoomModel.findById(orderObj.hotelId)
            .lean()
            .exec();
          obj3.hotelName = obj3.hotelName + " - " + hotelObj.name;
        }
        obj3.hotelImage = "/api/uploads/" + hotelObj.mainImage;
      }

      if (orderObj?.accountId) {
        let roomObj = await createReceiptRmsApi(orderObj);
        if (roomObj) {
          let orderObj = await Order.findByIdAndUpdate(req.params.orderId, {
            receiptId: roomObj,
          })
            .lean()
            .exec();
        }
      }
    }

    // let emailArr=[orderObj?.addressObj?.email]
    let title = "Booking has been confirmed";

    let emailArr = [orderObj.email, "hello@wabisabistays.com"];
    let customerTitle = `Booking has been confirmed #${orderObj._id}`;
    let adminTitle = `New Booking #${orderObj?._id} -  ${orderObj.name}`;

    obj3.createdAtDate2 = new Date(orderObj.createdAt).toDateString();
    obj3.checkin = new Date(orderObj.startDate).toDateString();
    obj3.checkout = new Date(orderObj.endDate).toDateString();
    obj3.dicountObj = orderObj.dicountObj ? orderObj.dicountObj : false;
    obj3.offerObj = orderObj.offerObj ? orderObj.offerObj : false;
    await sendMail(emailArr, customerTitle, obj3, true, "", false);
    let emailAr2 = ["naman@wabisabistays.com"];
    await sendMail(emailAr2, adminTitle, obj3, true, "", false);

    res.json({
      message: "Payment Successfull",
      success: true,
      orderId: orderObj._id,
      data: checkPaymentStatus?.data,
    });
  } catch (err) {
    next(err);
  }
};

///cod order

export const createCodOrder = async (req, res, next) => {
  try {
    const userObj = await User.findById(req.user.userId).lean().exec();
    if (!userObj) throw new Error("User Not Found");

    let userCartObj = await UserCart.findOne({ userId: req.user.userId })
      .lean()
      .exec();
    if (userCartObj.items.length <= 0) {
      throw new Error("Your Cart is empty");
    }
    let currencyObj = userCartObj?.currencyObj;

    for (let el of userCartObj.items) {
      let hotelObj = await HotelModel.findById(el.productId).lean().exec();
      if (!hotelObj) {
        throw new Error(`HotelModel Not Found Please empty your cart`);
      }
      el.price = hotelObj?.mrp;
      el.convertedPrice = parseFloat(
        (hotelObj?.mrp * currencyObj?.convertRate).toFixed(2)
      );
      let tempGst = hotelObj?.gst;
      let tempHalfGst = tempGst / 2;
      el.cgst = parseFloat((el.price * (tempHalfGst / 100)).toFixed(2));
      el.sgst = parseFloat((el.price * (tempHalfGst / 100)).toFixed(2));
      el.igst = parseFloat((el.price * (tempGst / 100)).toFixed(2));
      el.name = hotelObj?.name;
      el.sku = hotelObj?.sku;
      el.productImage = hotelObj?.productImage;
      el.totalPrice = (el.price + el.cgst + el.sgst) * el.quantity;
      el.convertedTotalPrice = parseInt(
        el.totalPrice * currencyObj?.convertRate
      );
      let stockup = parseInt(el.quantity);
      // console.log(stockup,"stockupstockupstockupstockup")
      let update = await HotelModel.findOneAndUpdate(
        { _id: el.productId },
        { $inc: { stock: -stockup } },
        { new: true }
      ).exec();

      // console.log(update,"updateupdateupdateupdateupdateupdateupdateupdateupdate")
    }

    let subTotalAmount = userCartObj.items.reduce(
      (acc, el) => acc + el.price * el.quantity,
      0
    );
    let subConvertdTotalAmount = parseFloat(
      (subTotalAmount * currencyObj?.convertRate).toFixed(2)
    );
    ///tax calculation
    let shippingCharges = 0;
    if (userCartObj.shipping) {
      totalAmount = parseInt(totalAmount) + parseInt(userCartObj.shipping);
      shippingCharges = userCartObj.shipping;

      // console.log(shippingCharges,"shippingChargesshippingChargesshippingCharges")
    }
    let totalAmount = userCartObj.items.reduce(
      (acc, el) => acc + (el.price + el.cgst + el.sgst) * el.quantity,
      0
    );
    totalAmount = parseInt(totalAmount);
    let convertedTotalAmount = parseInt(
      (totalAmount * currencyObj?.convertRate).toFixed(2)
    );
    let obj = {
      userId: req.user.userId,
      currencyObj: currencyObj,
      addressObj: req.body.addressObj,
      productsArr: userCartObj.items,
      subTotalAmount,
      subConvertdTotalAmount,
      totalAmount,
      convertedTotalAmount,
      active: true,
      paymentObj: {
        paymentChk: 2,
      },
    };
    let orderObj = await new Order(obj).save();
    await UserCart.findOneAndUpdate(
      { userId: `${req.user.userId}` },
      { currencyObj: {}, items: [] }
    ).exec();

    res.status(200).json({ message: "Ordered Successfully", success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllActiveOrders = async (req, res, next) => {
  try {
    let query = {
      active: true,
    };

    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    let arr = await Order.find(query)
      .populate("hotelsArr.hotelId")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    for (const booking of arr) {
      if (booking.hotelId) {
        booking.hotelObj = await HotelModel.findById(booking.hotelId)
          .select("_id name mainImage hotelType tagline slug")
          .exec();
      }
      if (booking.roomId) {
        booking.roomObj = await RoomModel.findById(booking.roomId).exec();
      }
      if (booking.userId) {
        booking.userObj = await Users.findById(booking.userId).exec();
      }
    }

    res.status(200).json({ message: "Arr", data: arr, success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllActiveOrdersByUserId = async (req, res, next) => {
  try {
    let query = {};

    let completeBooking = await Order.find({
      active: true,
      userId: req.user.userId,
      startDate: { $lte: new Date() },
    })
      .populate("hotelsArr.hotelId")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    let upcomingBooking = await Order.find({
      active: true,
      userId: req.user.userId,
      startDate: { $gt: new Date() },
    })
      .populate("hotelsArr.hotelId")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    for (const booking of completeBooking) {
      if (booking.hotelId) {
        let hotelObj = await HotelModel.findById(booking.hotelId)
          .select("_id name mainImage hotelType tagline slug")
          .exec();

        if (hotelObj && hotelObj?._id) {
          booking.hotelObj = hotelObj;
        }
      }
    }
    for (const booking of upcomingBooking) {
      if (booking.hotelId) {
        let hotelObj = await HotelModel.findById(booking.hotelId)
          .select("_id name mainImage hotelType tagline slug")
          .exec();

        if (hotelObj && hotelObj?._id) {
          booking.hotelObj = hotelObj;
        }
      }
    }

    res.status(200).json({
      message: "Arr",
      data: completeBooking,
      upcomingBooking,
      success: true,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    let orderObj = await Order.findById(req.params.id)
      .populate("hotelsArr.hotelId")
      .lean()
      .exec();
    if (orderObj.hotelId) {
      orderObj.hotelObj = await HotelModel.findById(orderObj.hotelId).exec();
    }


    if (!orderObj) throw new Error("Order Not Found");
    res.status(200).json({ message: "Order", data: orderObj, success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const cancelOrderById = async (req, res, next) => {
  try {
    const orderObj = await Order.findByIdAndUpdate(req.params.id, {
      status: OrderStatus.CANCELLED,
    })
      .lean()
      .exec();
    res.status(200).json({ message: "Order Cancelled", success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const cancelUnconfirmedOrder = async () => {
  try {
    const orderArr = await Order.find({
      orderStatus: "PENDING",
      reservationId: { $exists: true },
    })
      .lean()
      .exec();
    
        let rmsAuthData = await rmsrmsAuthLogin();
     if (!rmsAuthData.token) {
       throw new Error("Unable to authorize");
     }
    for (const order of orderArr) {
      var date1 = moment(new Date());
      var date2 = moment(new Date(order.createdAt));
      var diff = date1.diff(date2, "minutes");
      if (diff >= 15) {
      console.log(diff, "diffdiffdiff", order?.reservationId);
        await cancelReservationById(rmsAuthData.token,order?.reservationId);
       await Order.findByIdAndUpdate(order._id, {
       orderStatus:"CANCELLED",
        });
      }
    }
   return true
  } catch (error) {
    console.error(error);
     return false;
  }
};
export const updateStatusOrderById = async (req, res, next) => {
  try {
    let orderObj = await Order.findById(req.params.id)
      .populate("productsArr.productId")
      .lean()
      .exec();
    if (!orderObj) throw new Error("Order Not Found");
    console.log(
      req.body,
      "---------------req.body-------------------------------"
    );
    // console.log(orderObj?.orderStatus,"------orderObjorderObjorderObjorderObjorderObj=============")

    // console.log(orderObj?.userId,"orderObjorderObjorderObjorderObjorderObj=============")

    let getUserEmail = await User.findById(orderObj?.userId).lean().exec();

    let status = req.body.orderStatus;
    if (!status) throw new Error("Status Not Valid");

    await Order.findByIdAndUpdate(req.params.id, req.body).lean().exec();

    let obj = {
      status,
      useEmail: "hello@wabisabistays.com",
      orderObjId: orderObj.orderId
        ? "#" + getOrderIdSequence(orderObj.orderId)
        : orderObj._id,
    };
    let title = `Your Order status ${obj.orderObjId} has been Updated`;
    let orderDispatchId = "";
    if (req.body.orderStatus == "DISPATCHED") {
      orderDispatchId = req.body.trackingId;
    }
    let subjet = `Your Order status has been ${status} here is the your order Id ${getOrderIdSequence(
      orderObj.orderId
    )}`;
    await sendMail(
      ["hello@wabisabistays.com", getUserEmail?.email],
      title,
      subjet,
      false,
      orderDispatchId,
      false
    );
    res
      .status(200)
      .json({ message: "Order Status Updated Successfully", success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// export const generateInvoice = async (req, res, next) => {
//     try {
//         let orderObj = await Order.findById(req.params.id).lean().exec();
//         if (!orderObj) throw new Error("Order Not Found");

//         let invoiceUrl = `public/uploads/${orderObj._id}.pdf`;
//         let displayInvoiceUrl = `uploads/${orderObj._id}.pdf`;

//         await createInvoice(orderObj, invoiceUrl);
//         // await setTimeout(async () => {
//         //     await fs.unlink(invoiceUrl);
//         // }, 10000);
//         res.status(200).json({ message: "Invoice generated", data: displayInvoiceUrl, success: true });
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };

export const updateStatusHotelModelsInBulk = async (req, res, next) => {
  try {
    if (!req.body.status) {
      throw new Error("Please Fill Order Status");
    }

    if (!req.body.orderId) {
      throw new Error("Please Fill Order Id");
    }

    let productsArr = await Order.updateMany(
      { _id: { $in: [...req.body.orderId.map((el) => `${el.orderId}`)] } },
      { $set: { orderStatus: req.body.status } }
    ).exec();
    res
      .status(200)
      .json({ message: "Bulk Status updated successfully", success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
