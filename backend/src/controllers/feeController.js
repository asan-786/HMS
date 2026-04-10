// const Fee = require("../models/Fee");

// exports.payFee = async (req,res)=>{
//     try{
//         const fee = new Fee(req.body);
//         await fee.save();
//         res.status(201).json(fee);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

// exports.getFees = async (req,res)=>{
//     try{
//         const fees = await Fee.find().populate("student");
//         res.json(fees);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

const Fee = require("../models/Fee");
const Student = require("../models/Student");

// GET /api/fees  (student sees own, admin sees all)
exports.getFees = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "student") {
      const student = await Student.findOne({ user: req.user.id });
      if (!student) return res.status(404).json({ success: false, message: "Student not found" });
      query.student = student._id;
    }
    const fees = await Fee.find(query).populate("student", "name rollNo").sort("-createdAt");
    res.json({ success: true, fees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/fees  (admin creates fee record)
exports.createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json({ success: true, fee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/fees/:id/pay  (student marks as paid)
exports.markAsPaid = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      { paid: true, paidAt: Date.now() },
      { new: true }
    );
    if (!fee) return res.status(404).json({ success: false, message: "Fee record not found" });
    // Update student feesPaid flag if hostel fee
    if (fee.type === "Hostel") {
      await Student.findByIdAndUpdate(fee.student, { feesPaid: true });
    }
    res.json({ success: true, fee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};