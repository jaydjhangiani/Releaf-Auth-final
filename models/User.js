const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name."],
    select: false,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name."],
    select: false,
  },
  username: {
    type: String,
    required: [true, "Please provide an username."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    // unique: true,
    select: false,
    // match: [
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   "Please provide a valid email.",
    // ],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number."],
    // unique: true,
    select: false,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minLength: 8,
    select: false,
  },
  typeOfUser: {
    type: String,
    default: "user",
    select: false,
  },
  // emergencyContactNumbers: {
  //   emergencyContactOne: {
  //     type: String,
  //     required: [true, "Please provide an emergency phone number."],
  //     select: false,
  //   },
  //   emergencyContactTwo: {
  //     type: String,
  //     select: false,
  //   },
  //   emergencyContactThree: {
  //     type: String,
  //     select: false,
  //   },
  // },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET_AUTH,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRE,
    }
  );
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

// const User = mongoose.model("User", UserSchema);
const User = mongoose.model("TestingUser", UserSchema);

module.exports = User;
