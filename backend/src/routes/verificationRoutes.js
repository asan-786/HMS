const router = require("express").Router();

const c = require(
   "../controllers/verificationController"
);

const {
   protect,
   adminOnly
} = require(
   "../middleware/auth.middleware"
);

router.post(
   "/upload",
   protect,
   adminOnly,
   c.uploadRollNumbers
);

module.exports = router;