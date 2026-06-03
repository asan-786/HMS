
const Notice = require("../models/Notice");
// GET /api/notices
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find()   // ✅ remove isActive filter
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, notices });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/notices  (admin)
console.log("notice cnotroler loaded");
exports.createNotice = async (req, res) => {
  try {
    console.log("🔥 API HIT");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

        // ✅ SAFETY CHECK (IMPORTANT)
    if (!req.body || !req.body.title || !req.body.message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required"
      });
    }

    const notice = await Notice.create({
      title: req.body.title,
      content: req.body.message,   
      important: req.body.important === "true",
      pdf: req.file ? req.file.filename : "",
      postedBy: req.user.id
    });

    res.status(201).json({ success: true, notice });

  } catch (err) {
    console.error("NOTICE ERROR:", err); // 🔥 MUST SEE THIS
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
    res.json({ success: true, message: "Notice deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};







// POST /api/notices  (admin)
// exports.createNotice = async (req, res) => {
//   try {
//     const notice = await Notice.create({ ...req.body, postedBy: req.user.id });
//     res.status(201).json({ success: true, notice });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };




// GET /api/notices  (all users)
// exports.getNotices = async (req, res) => {
//   try {
//     const notices = await Notice.find({ isActive: true }).populate("postedBy", "name").sort("-createdAt");
//     res.json({ success: true, notices });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };