const router = require("express").Router();
const c = require("../controllers/noticeController");
const upload = require("../middleware/upload");
const { protect, adminOnly } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/",       c.getNotices); 
router.post("/",  adminOnly, upload.single("pdf"), c.createNotice);
// router.post("/",      adminOnly, c.createNotice);
router.put("/:id",    adminOnly, c.updateNotice);
router.delete("/:id", adminOnly, c.deleteNotice);

module.exports = router;