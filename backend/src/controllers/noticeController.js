// const Notice = require("../models/Notice");

// exports.createNotice = async (req,res)=>{
//     try{
//         const notice = new Notice(req.body);
//         await notice.save();
//         res.status(201).json(notice);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

// exports.getNotices = async (req,res)=>{
//     try{
//         const notices = await Notice.find().populate("postedBy");
//         res.json(notices);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };









const Notice = require("../models/Notice");

// GET /api/notices  (all users)
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ isActive: true }).populate("postedBy", "name").sort("-createdAt");
    res.json({ success: true, notices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/notices  (admin)
exports.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json({ success: true, notice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/notices/:id  (admin)
exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notice) return res.status(404).json({ success: false, message: "Notice not found" });
    res.json({ success: true, notice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/notices/:id  (admin)
exports.deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: "Notice removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};