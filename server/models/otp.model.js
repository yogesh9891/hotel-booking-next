const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructure Schema from mongoose
const { sendOtp } = require("../helpers/Otp");

// Define the OTP interface (not strictly necessary in JavaScript)
const otpSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // 5 minutes expiration
  },
});

// Define a function to send verification SMS
async function sendVerificationSMS(phone, otp) {
  try {
    await sendOtp(phone, otp);
  } catch (error) {
    console.log("Error occurred while sending phone: ", error);
    throw error;
  }
}

// Pre-save hook
otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  if (this.isNew) {
    await sendVerificationSMS(this.phone, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", otpSchema); // CommonJS export
