const express = require("express");
const router = express.Router();
const { createExpert } = require("../controllers/experts.controller");

router.route("/register").post(createExpert);

module.exports = router;
