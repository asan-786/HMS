
// const router = require("express").Router();
// const c = require("../controllers/studentController");
// const {createAdmission} = require("../controllers/studentController");
// const { protect, adminOnly } = require("../middleware/auth.middleware");

// // router.use(protect);

// router.get("/",       adminOnly, c.getAllStudents);
// router.get("/me",     protect,     c.getMyProfile);
// router.put("/me",      protect,     c.updateMyProfile);
// router.get("/:id",    adminOnly, c.getStudentById);
// router.put("/:id",    adminOnly, c.updateStudent);
// router.delete("/:id", adminOnly, c.deleteStudent);
// router.post("/admission",protect,createAdmission);

// module.exports = router;





const router = require("express").Router();

const c = require("../controllers/studentController");

const {
   createAdmission
} = require("../controllers/studentController");

const {
   protect,
   adminOnly
} = require("../middleware/auth.middleware");

// ✅ Admin routes
router.get(
   "/",
   protect,
   adminOnly,
   c.getAllStudents
);

// ✅ Student profile
router.get(
   "/me",
   protect,
   c.getMyProfile
);

router.put(
   "/me",
   protect,
   c.updateMyProfile
);

// ✅ Admission form
router.post(
   "/admission",
   protect,
   createAdmission
);

// ✅ Admin manages students
router.get(
   "/:id",
   protect,
   adminOnly,
   c.getStudentById
);

router.put(
   "/:id",
   protect,
   adminOnly,
   c.updateStudent
);

router.delete(
   "/:id",
   protect,
   adminOnly,
   c.deleteStudent
);

module.exports = router;
