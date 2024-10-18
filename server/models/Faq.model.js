import mongoose from "mongoose";

let Faq = mongoose.Schema(
  {
    type: String,
    question: String,
    answer: String,
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Faq", Faq);
