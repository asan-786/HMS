// const mongoose = require("mongoose");

// const complaintSchema = new mongoose.Schema({

//     student: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Student"
//     },

//     title: String,

//     description: String,

//     status: {
//         type: String,
//         enum: ["pending", "in-progress", "resolved"],
//         default: "pending"
//     },

//     createdAt: {
//         type: Date,
//         default: Date.now
//     }

// });

// module.exports = mongoose.model("Complaint", complaintSchema);









const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  student:     { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  studentName: { type: String },
  type:        { type: String, enum: ["Maintenance", "Mess", "Cleanliness", "Security", "Other"], required: true },
  subject:     { type: String, required: true },
  description: { type: String, required: true },
  status:      { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
  adminReply:  { type: String, default: "" },
  repliedAt:   { type: Date },
  repliedBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);