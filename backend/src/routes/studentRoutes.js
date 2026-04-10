
const router = require("express").Router();
const c = require("../controllers/studentController");

const { protect, adminOnly } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/",       adminOnly, c.getAllStudents);
router.get("/me",                c.getMyProfile);
router.put("/me",                c.updateMyProfile);
router.get("/:id",    adminOnly, c.getStudentById);
router.put("/:id",    adminOnly, c.updateStudent);
router.delete("/:id", adminOnly, c.deleteStudent);

module.exports = router;



