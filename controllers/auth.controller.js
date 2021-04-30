const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.register = async function (req, res, next) {
  const {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    password,
  } = req.body;
  try {
    const user = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    if (!user) {
      const activateToken = jwt.sign(
        {
          firstName,
          lastName,
          username,
          email,
          phoneNumber,
          password,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "20min",
        }
      );

      const activateUrl = `${process.env.FRONT_END_URI}/activate-account/${activateToken}`;

      const message = `
            <h1>Activate Your Account</h1>
            <p>Please go to this link to activate your account</p>
            <a href=${activateUrl} clicktracking=off >${activateUrl}</a>
            `;
      try {
        await sendEmail({
          to: email,
          activationToken: activateUrl,
          templateName: "activationEmail",
        });

        res.status(200).json({
          success: true,
          data: "email sent!",
        });
      } catch (error) {
        return next(new ErrorResponse("Email Could not be sent!", 500));
      }
    } else {
      return next(new ErrorResponse("User Already Exists", 409));
    }
  } catch (error) {
    next(error);
  }
};

exports.activation = async (req, res, next) => {
  const token = req.params.activateToken;
  const emergencyContactNumber = req.body;

  decoded = jwt.verify(token, process.env.JWT_SECRET);

  const {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    password,
  } = decoded;

  try {
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      password,
      emergencyContactNumbers: {
        emergencyContactOne: Object.values(emergencyContactNumber)[0],
        emergencyContactTwo: Object.values(emergencyContactNumber)[1],
        emergencyContactThree: Object.values(emergencyContactNumber)[2],
      },
    });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide an email and password.", 400)
    );
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invlaid Credentials.", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invlaid Credentials.", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.FRONT_END_URI}/user/reset-password/${resetToken}`;

    try {
      console.log(email);
      await sendEmail({
        to: email,
        resetToken: resetUrl,
        templateName: "passwordResetEmail",
      });

      res.status(200).json({
        success: true,
        data: "email sent!",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return next(new ErrorResponse("Email Could not be sent!", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  console.log(resetPasswordToken);
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password reset successfully!",
    });
  } catch (error) {
    next(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
