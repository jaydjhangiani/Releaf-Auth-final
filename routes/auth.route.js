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

router.route("/login").post(login);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:resetToken").put(resetPassword);

module.exports = router;
