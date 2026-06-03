const router = require("express").Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/auth.middleware");
const { getAllStudents } = require("../controllers/studentController");
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect ,getMe);
router.get("/all-students", protect, adminOnly, getAllStudents);

module.exports = router;