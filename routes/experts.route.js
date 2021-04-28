const express = require('express')
const router = express.Router()
const {
	createExpert,
	fetchAllExperts,
	changeStatusOfExpert,
} = require('../controllers/experts.controller')

router.route('/register').post(createExpert)
router.route('/verify').post(changeStatusOfExpert)
router.route('/').get(fetchAllExperts)

module.exports = router
