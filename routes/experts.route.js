const express = require('express')
const router = express.Router()
const {
	createExpert,
	fetchAllExperts,
} = require('../controllers/experts.controller')

router.route('/register').post(createExpert)
router.route('/').get(fetchAllExperts)

module.exports = router
