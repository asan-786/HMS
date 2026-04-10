// const express = require("express");

// const router = express.Router();

// const messController = require("../controllers/messMenuController");

// router.post("/", messController.createMenu);

// router.get("/", messController.getMenu);

// module.exports = router;








const router = require("express").Router();
const c = require("../controllers/messMenuController");
const { protect, adminOnly } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/menu",          c.getMenu);
router.put("/menu/:day",     adminOnly, c.updateMenuItem);
router.post("/enroll",       c.enrollMess);
router.post("/unenroll",     c.unenrollMess);
 
module.exports = router;