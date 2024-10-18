import razorpay from "razorpay";
let instance = new razorpay({ key_id: process.env.razorPayApiKey, key_secret: process.env.razorPayApiSecret });

export const createPaymentOrder = async (options) => {
  try {
    let orderObj = await instance.orders.create(options);
    return orderObj;
  } catch (error) {
    console.error(error);
    return error;
  }
};
