const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  activation,
} = require("../controllers/auth.controller");

router.route("/register").post(register);

router.route("/activate/:activateToken").put(activation);

router.route("/user/login").post(login);

router.route("/user/forgot-password").post(forgotPassword);

router.route("/user/reset-password/:resetToken").put(resetPassword);

module.exports = router;
