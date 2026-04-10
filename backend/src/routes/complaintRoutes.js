// const express = require("express");

// const router = express.Router();

// const complaintController = require("../controllers/complaintController");

// router.post("/", complaintController.createComplaint);

// router.get("/", complaintController.getComplaints);

// module.exports = router;









const router = require("express").Router();
const c = require("../controllers/complaintController");
const { protect, adminOnly } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/",                c.getComplaints);
router.post("/",               c.createComplaint);
router.put("/:id/reply",       adminOnly, c.replyToComplaint);
router.delete("/:id",          adminOnly, c.deleteComplaint);

module.exports = router;