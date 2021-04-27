const Expert = require("../models/Expert");
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
    const expert = await Exxpert.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    if (!expert) {
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

      try {
        await sendEmail({
          to: email,
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

// exports.activation = async (req, res, next) => {
//   const token = req.params.activateToken;
//   const emergencyContactNumber = req.body;

//   decoded = jwt.verify(token, process.env.JWT_SECRET);

//   const {
//     firstName,
//     lastName,
//     username,
//     email,
//     phoneNumber,
//     password,
//   } = decoded;

//   try {
//     const user = await User.create({
//       firstName,
//       lastName,
//       username,
//       email,
//       phoneNumber,
//       password,
//       emergencyContactNumbers: {
//         emergencyContactOne: Object.values(emergencyContactNumber)[0],
//         emergencyContactTwo: Object.values(emergencyContactNumber)[1],
//         emergencyContactThree: Object.values(emergencyContactNumber)[2],
//       },
//     });
//     sendToken(user, 201, res);
//   } catch (error) {
//     next(error);
//   }
// };

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide an email and password.", 400)
    );
  }

  try {
    const user = await Expert.findOne({ email }).select("+password");

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
    const expert = await Expert.findOne({ email });

    if (!expert) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = expert.getResetPasswordToken();

    await expert.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

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
      expert.resetPasswordToken = undefined;
      expert.resetPasswordExpire = undefined;
      await expert.save();
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
    const expert = await Expert.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    console.log(expert);

    if (!expert) {
      return next(new ErrorResponse("Invalid Reset Token", 400));
    }

    expert.password = req.body.password;
    expert.resetPasswordToken = undefined;
    expert.resetPasswordExpire = undefined;

    await expert.save();

    res.status(201).json({
      success: true,
      data: "Password reset successfully!",
    });
  } catch (error) {
    next(error);
  }
};

const sendToken = (expert, statusCode, res) => {
  const token = expert.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
