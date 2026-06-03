const router = require("express").Router();
const c = require("../controllers/allocationController");
const { protect, adminOnly } = require("../middleware/auth.middleware");

router.use(protect, adminOnly);



router.post("/run",        c.runAllocation);
router.post("/assign",     c.assignRoom);
router.post("/deallocate", c.deallocateRoom);
router.post(
   "/auto",
   adminOnly,
   c.autoAllocateMeritRooms
);
router.post("/auto-merit",protect,adminOnly,                  c.autoAllocateMeritRooms
);
  
module.exports = router;