const router = require("express").Router();

const controller = require("../controllers/hostelAdmissionController");

const {protect} = require("../middleware/auth.middleware");

router.post("/",protect , controller.submitAdmission);

module.exports = router;