const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId:    { type: String, required: true, unique: true },   // e.g. "A-101"
  block:     { type: String, required: true },
  floor:     { type: Number, required: true },
  capacity:  { type: Number, required: true },
  occupied:  { type: Number, default: 0 },
  type:      { type: String, enum: ["Single", "Double", "Triple"], required: true },
  amenities: [{ type: String }],
  isActive:  { type: Boolean, default: true },
}, { timestamps: true });

roomSchema.virtual("available").get(function () {
  return this.occupied < this.capacity;
});

module.exports = mongoose.model("Room", roomSchema);