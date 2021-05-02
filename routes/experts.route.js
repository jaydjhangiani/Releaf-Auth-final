const express = require('express')
const router = express.Router()
const {
	createExpert,
	fetchAllExperts,
	changeStatusOfExpert,
	expertLogin,
	expertsForgotPassword,
	expertsResetPassword,
	getExpertById,
} = require('../controllers/experts.controller')

router.route('/register').post(createExpert)
router.route('/verify').post(changeStatusOfExpert)
router.route('/login').post(expertLogin)
router.route('/forgot-password').post(expertsForgotPassword)
router.route('/reset-password/:resetToken').put(expertsResetPassword)
router.route('/').post(getExpertById)
router.route('/').get(fetchAllExperts)

module.exports = router
