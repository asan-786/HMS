// const Complaint = require("../models/complaint");

// exports.createComplaint = async (req,res)=>{
//     try{
//         const complaint = new Complaint(req.body);
//         await complaint.save();
//         res.status(201).json(complaint);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

// exports.getComplaints = async (req,res)=>{
//     try{
//         const complaints = await Complaint.find().populate("student");
//         res.json(complaints);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

const Complaint = require("../models/Complaint");
const Student = require("../models/Student");

// GET /api/complaints  (admin sees all, student sees own)
exports.getComplaints = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "student") {
      const student = await Student.findOne({ user: req.user.id });
      if (!student) return res.status(404).json({ success: false, message: "Student not found" });
      query.student = student._id;
    } 
    const complaints = await Complaint.find(query).populate("student", "name rollNo room").sort("-createdAt");
    res.json({ success: true, complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/complaints  (student)
exports.createComplaint = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    const complaint = await Complaint.create({
      ...req.body, student: student._id, studentName: student.name,
    });
    res.status(201).json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/complaints/:id/reply  (admin)
exports.replyToComplaint = async (req, res) => {
  try {
    const { adminReply, status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { adminReply, status: status || "Resolved", repliedAt: Date.now(), repliedBy: req.user.id },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found" });
    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/complaints/:id  (admin)
exports.deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Complaint deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};