const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  pdf: { type: String},
  important: { type: Boolean, default: false },
  postedBy:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isActive:  { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Notice", noticeSchema);