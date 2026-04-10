// const express = require("express");

// const router = express.Router();

// const feeController = require("../controllers/feeController");

// router.post("/", feeController.payFee);

// router.get("/", feeController.getFees);

// module.exports = router;




const router = require("express").Router();
const c = require("../controllers/feeController");
const { protect, adminOnly } = require("../middleware/auth.middleware");

router.use(protect);  

router.get("/",          c.getFees);
router.post("/",         adminOnly, c.createFee);
router.put("/:id/pay",   c.markAsPaid);

module.exports = router;