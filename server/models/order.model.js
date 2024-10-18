import mongoose from "mongoose";
import { OrderStatus, OrderType } from "../helpers/OrderStatus";
let Order = mongoose.Schema(
  {
    addressObj: {
      addressId: { type: mongoose.Types.ObjectId },
      city: { type: String },
      street: String,
      name: String,
      state: { type: String },
      landmark: String,
      addressLine1: String,
      addressLine2: String,
      country: String,
      companyName: String,
      pincode: String,
      phone: String,
      email: String,
      orderNotes: String,
    },
    guestArr: [
      {
        firstName: String,
        lastName: String,
        guesttype: String,
      },
    ],
    name: String,
    mobile: String,
    email: String,
    nights: String,
    adult: String,
    child: String,
    startDate: Date,
    endDate: Date,
    userId: String,
    rmsPropertyId: String,
    guestId: String,
    accountId: String,
    receiptId: String,
    reservationId: String,
    hotelId: {
      type: mongoose.Types.ObjectId,
      ref: "hotel",
    },
    roomId: {
      type: mongoose.Types.ObjectId,
      ref: "room",
    },
    hotelsArr: [
      {
        hotelId: {
          type: mongoose.Types.ObjectId,
          ref: "Hotel",
        },
        roomId: {
          type: mongoose.Types.ObjectId,
          ref: "room",
        },
        price: Number,
        name: String,
        image: String,
        guestId: String,
        rmsPropertyId: String,
        areaId: String,
        rateId: String,
        accountId: String,
        receiptId: String,
        reservationId: String,
        totalPrice: Number,
        room: Number,
        cgst: Number,
        sgst: Number,
        igst: Number,
      },
    ],
    gst: {
      tax: {
        type: Number,
        default: 0,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
    subTotalAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
      default: OrderStatus.PENDING,
    },
    orderStatusArr: [
      {
        orderStatus: String,
        updatedOn: String,
      },
    ],

    dicountObj: {
      code: String,
      amount: Number,
    },

    offerObj: {
      code: String,
      amount: Number,
    },
    paymentObj: {
      paymentId: String,
      gatwayPaymentObj: Object, // razorpay
      amountPayedFromWallet: {
        type: Number,
        default: 0,
      },
      paymentChk: {
        // 0 means payment has not occured ,1 means payment successful, -1 means payment failed ,2 for cod
        type: Number, //  this will also be 1 if the payableamount is 0
        default: 0, // if payment is not 1 then it wont be able to proceed
      },
    },
    active: {
      type: Boolean,
      default: false,
    },
    orderNotes: String,
  },
  { timestamps: true }
);
export default mongoose.model("Order", Order);
