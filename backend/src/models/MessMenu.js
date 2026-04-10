// const mongoose = require("mongoose");

// const messMenuSchema = new mongoose.Schema({

//     day: {
//         type: String,
//         required: true
//     },

//     breakfast: String,

//     lunch: String,

//     dinner: String

// }, { timestamps: true });

// module.exports = mongoose.model("MessMenu", messMenuSchema);










const mongoose = require("mongoose");

const messMenuSchema = new mongoose.Schema({
  day:       { type: String, enum: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], required: true, unique: true },
  breakfast: { type: String, required: true },
  lunch:     { type: String, required: true },
  dinner:    { type: String, required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("MessMenu", messMenuSchema);