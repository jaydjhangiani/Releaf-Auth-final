const express = require("express");
const router = express.Router();
const {
  getPrivateData,
  getUser,
  getExpert,
  getRss,
} = require("../controllers/private.controller");
const { protect } = require("../middleware/auth");
const { expertProtect } = require("../middleware/expert");

router.route("/").get(protect, getPrivateData);

router.route("/user").get(protect, getUser);
router.route("/expert").get(expertProtect, getExpert);

router.route("/rss").post(getRss);

module.exports = router;
