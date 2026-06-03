// // const mongoose = require("mongoose");

// // const studentSchema = new mongoose.Schema({

// //     name: {
// //         type: String,
// //         required: true
// //     },

// //     email: {
// //         type: String,
// //         required: true,
// //         unique: true
// //     },

// //     phone: String,

// //     course: String,

// //     year: Number,

// //     address: String,

// //     roomNumber: Number,

// //     admissionDate: {
// //         type: Date,
// //         default: Date.now
// //     }

// // }, { timestamps: true });

// // module.exports = mongoose.model("Student", studentSchema);








// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   user:          { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   name:          { type: String, required: true },
//   rollNo:        { type: String, required: true, unique: true },
//   cgpa:          { type: Number, required: true, min: 0, max: 10 },
//   category:      { type: String, enum: ["General", "OBC", "SC", "ST", "EWS"], default: "General" },
//   email:         { type: String, required: true },
//   phone:         { type: String },
//   room:          { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null },
//   messEnrolled:  { type: Boolean, default: false },
//   feesPaid:      { type: Boolean, default: false },
//   admissionDate: { type: Date, default: Date.now },
//   parentName:    { type: String },
//   parentPhone:   { type: String },
//   address:       { type: String },
//   isActive:      { type: Boolean, default: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Student", studentSchema);





const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: {
    type: String,
    required: true
  },

  rollNo: {
    type: String,
    required: true,
    unique: true
  },

  cgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },

  category: {
    type: String,
    enum: ["General", "OBC", "SC", "ST", "EWS"],
    default: "General"
  },

  // ✅ ADD THIS
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male"
  },

  // ✅ ADD THIS
  year: {
    type: String,
    enum: [
      "1st Year",
      "2nd Year",
      "3rd Year",
      "Fnal Year"
    ],
    default: "1st Year"
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    default: null
  },

  messEnrolled: {
    type: Boolean,
    default: false
  },

  feesPaid: {
    type: Boolean,
    default: false
  },

  admissionDate: {
    type: Date,
    default: Date.now
  },

  parentName: {
    type: String
  },

  parentPhone: {
    type: String
  },

  guardianName: {

   type: String
},

guardianPhone: {

   type: String
},

  address: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model(
  "Student",
  studentSchema
);