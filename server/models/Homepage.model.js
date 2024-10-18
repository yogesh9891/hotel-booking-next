import mongoose from "mongoose";

let HomePage = mongoose.Schema(
  {
    location: [{
      _id:String,
      name:String,
    }],
    mostViewProperties: [{
      _id:String,
      name:String,
    }],
    preminumCollection: [{
      _id:String,
      name:String,
    }],
    budgetFriendly: [{
      _id:String,
      name:String,
    }],
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("HomePage", HomePage);
