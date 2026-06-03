const mongoose = require("mongoose");

const verifiedStudentSchema = new mongoose.Schema({

   rollNumber: {
      type: String,
      required: true,
      unique: true
   },

   isUsed: {
      type: Boolean,
      default: false
   }
});

module.exports = mongoose.model(
   "VerifiedStudent",
   verifiedStudentSchema
);