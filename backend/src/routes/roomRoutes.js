// const express = require("express");

// const router = express.Router();

// const roomController = require("../controllers/roomController");

// router.post("/", roomController.allocateRoom);

// router.get("/", roomController.getRooms);

// module.exports = router;



const router = require("express").Router();
const c = require("../controllers/roomController");
const { protect, adminOnly } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/",           c.getAllRooms);
router.get("/available",  c.getAvailableRooms);
router.get("/:id",        c.getRoomById);
router.post("/",          adminOnly, c.createRoom);
router.put("/:id",        adminOnly, c.updateRoom);

module.exports = router;


