const express = require("express");
const router = express.Router();
const {
  getPrivateData,
  getUser,
  getRss,
} = require("../controllers/private.controller");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getPrivateData);

router.route("/user").get(protect, getUser);

router.route("/rss").post(protect, getRss);

module.exports = router;
