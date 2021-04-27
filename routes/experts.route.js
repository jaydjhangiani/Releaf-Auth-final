const express = require('express')
const router = express.Router()
const { createExpert } = require('../controllers/experts.controller')

router.route('/').post(createExpert)

module.exports = router
