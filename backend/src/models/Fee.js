// const mongoose = require("mongoose");

// const feeSchema = new mongoose.Schema({

//     student: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Student"
//     },

//     amount: {
//         type: Number,
//         required: true
//     },

//     paymentDate: {
//         type: Date,
//         default: Date.now
//     },

//     status: {
//         type: String,
//         enum: ["paid", "pending"],
//         default: "pending"
//     },

//     paymentMethod: {
//         type: String,
//         enum: ["cash", "online"]
//     }

// }, { timestamps: true });

// module.exports = mongoose.model("Fee", feeSchema);







const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  student:     { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  type:        { type: String, enum: ["Hostel", "Mess", "Security", "Maintenance"], required: true },
  amount:      { type: Number, required: true },
  month:       { type: String },   // e.g. "March 2025" for mess fees
  year:        { type: Number },
  paid:        { type: Boolean, default: false },
  paidAt:      { type: Date },
  dueDate:     { type: Date },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Fee", feeSchema);