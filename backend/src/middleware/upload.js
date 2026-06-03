// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");   // folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf" || file.originalname.endsWith(".pdf")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF allowed"), false);
//   }
// };

// module.exports = multer({ storage, fileFilter });




const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// ✅ FIXED FILTER (IMPORTANT)
const fileFilter = (req, file, cb) => {
  const isPdf =
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/octet-stream" || // 🔥 allow this
    file.originalname.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF allowed"), false);
  }
};

module.exports = multer({ storage, fileFilter });