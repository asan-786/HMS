// const Student = require("../models/Student");

// exports.createStudent = async (req,res)=>{
//     try{
//         const student = new Student(req.body);
//         await student.save();
//         res.status(201).json(student);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

// exports.getStudents = async (req,res)=>{
//     try{
//         const students = await Student.find();
//         res.json(students);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

// exports.getStudentById = async (req,res)=>{
//     try{
//         const student = await Student.findById(req.params.id);
//         res.json(student);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

// exports.deleteStudent = async (req,res)=>{
//     try{
//         await Student.findByIdAndDelete(req.params.id);
//         res.json({message:"Student deleted"});
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };


const Student = require("../models/Student");
const Room = require("../models/Room");

// GET /api/students  (admin only)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ isActive: true }).populate("room", "roomId block floor type");
    res.json({ success: true, count: students.length, students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/students/me  (logged-in student)
exports.getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id }).populate("room");
    if (!student) return res.status(404).json({ success: false, message: "Student profile not found" });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/students/:id
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("room");
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/students/me  (student updates own profile)
exports.updateMyProfile = async (req, res) => {
  try {
    const allowed = ["phone", "parentName", "parentPhone", "address"];
    const updates = {};
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });
    const student = await Student.findOneAndUpdate({ user: req.user.id }, updates, { new: true });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/students/:id  (admin updates any student)
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/students/:id (admin)
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: "Student deactivated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};