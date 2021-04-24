const express = require("express");
const { sendContactMail } = require("../controllers/contact.controller");
const router = express.Router();

router.route("/").post(sendContactMail);

module.exports = router;
