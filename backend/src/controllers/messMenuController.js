// const MessMenu = require("../models/MessMenu");

// exports.createMenu = async (req,res)=>{
//     try{
//         const menu = new MessMenu(req.body);
//         await menu.save();
//         res.status(201).json(menu);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

// exports.getMenu = async (req,res)=>{
//     try{
//         const menu = await MessMenu.find();
//         res.json(menu);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };





const MessMenu = require("../models/MessMenu");
const Student = require("../models/Student");

// GET /api/mess/menu
exports.getMenu = async (req, res) => {
  try {
    const menu = await MessMenu.find().sort("day");
    res.json({ success: true, menu });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/mess/menu/:day  (admin)
exports.updateMenuItem = async (req, res) => {
  try {
    const { day } = req.params;
    const item = await MessMenu.findOneAndUpdate(
      { day },
      { ...req.body, updatedBy: req.user.id },
      { new: true, upsert: true }
    );
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/mess/enroll  (student)
exports.enrollMess = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { user: req.user.id },
      { messEnrolled: true },
      { new: true }
    );
    res.json({ success: true, message: "Enrolled in mess successfully", student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/mess/unenroll  (student)
exports.unenrollMess = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { user: req.user.id },
      { messEnrolled: false },
      { new: true }
    );
    res.json({ success: true, message: "Unenrolled from mess", student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};