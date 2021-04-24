const express = require('express');
const router = express.Router();
const { getPrivateData, getUser } = require('../controllers/private.controller')
const {protect} = require('../middleware/auth')

router.route("/").get(protect, getPrivateData);

router.route("/user").get(protect, getUser)

module.exports = router;