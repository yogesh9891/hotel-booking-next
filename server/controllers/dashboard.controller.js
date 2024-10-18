import { MainOrderStatus, OrderStatus } from "../helpers/OrderStatus";
import OrderModels from "../models/order.model";
import productModel from "../models/Hotel.model";
import productReviewModel from "../models/review.model";
import userModel from "../models/user.model";
import LocationModel from "../models/Location.model";

export const getDashboard = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }
    const totalOrder = await OrderModels.countDocuments().exec();
    const totalAuthOrder = await OrderModels.countDocuments({
      userId: { $ne: null },
    }).exec();
    const totalPendingOrder = await OrderModels.countDocuments({
      orderStatus: OrderStatus.PENDING,
    }).exec();
    const totalCompleteOrder = await OrderModels.countDocuments({
      orderStatus: OrderStatus.CONFIRMED,
    }).exec();
 
    const totalRevenue = await OrderModels.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } },
    ]).exec();
    const totalUser = await userModel.countDocuments().exec();
    const totalActiveUser = await userModel
      .countDocuments({ isActive: true })
      .exec();
      const totalApatments = await productModel
        .countDocuments({ hotelType: "Home Stays" })
        .exec();
      const totalHotels = await productModel
        .countDocuments({ hotelType: "Hotels" })
        .exec();
    const totalActiveProduct = await productModel
      .countDocuments()
      .exec();
    const totalProductReview = await productReviewModel.countDocuments().exec();

    const topProductOrder = await OrderModels.aggregate([
      {
        $group: {
          _id: "$hotelId",
          count: {
            $sum: 1,
          },
        },
      },
      { $sort: { count: -1 } },
      {
        $unwind: {
          path: "$_id",
        },
      },
      {
        $lookup: {
          from: "hotels",
          localField: "_id",
          foreignField: "_id",
          as: "productObj",
        },
      },
      {
        $unwind: {
          path: "$productObj",
        },
      },
      {
        $addFields: {
          name: "$productObj.name",
        },
      },
      {
        $unset: "productObj",
      },
      {
        $limit: 10,
      },
    ]).exec();

    const categoryWiseProduct = await LocationModel.aggregate([
      {
        $addFields: {
          locationId: {
            $toString: "$_id",
          },
        },
      },
      {
        $lookup: {
          from: "hotels",
          localField: "locationId",
          foreignField: "location",
          as: "prodctsArr",
        },
      },
      {
        $addFields: {
          total: {
            $size: "$prodctsArr",
          },
        },
      },
      {
        $unset: "prodctsArr",
      },
    ]).exec();
    let data = {
      totalOrder,

      totalAuthOrder,
      totalPendingOrder,
      totalCompleteOrder,
      totalRevenue,
      totalUser,
      totalActiveUser,
        totalApatments,
      totalHotels,
      totalActiveProduct,
      totalProductReview,
      topProductOrder,
      categoryWiseProduct,
    };
    res
      .status(200)
      .json({ message: "dashboard Data", data: data, success: true });
  } catch (err) {
    next(err);
  }
};
