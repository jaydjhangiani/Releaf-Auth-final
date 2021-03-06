const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ExpertSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name."],
    // select: false,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name."],
    // select: false,
  },
  specialization: {
    type: String,
    required: [true, "Please provide specialization."],
    // unique: true,
    // select: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
    // select: false,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email.",
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number."],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please provide address."],
    // select: false,
  },
  city: {
    type: String,
    required: [true, "Please provide city."],
  },
  pinCode: {
    type: String,
    required: [true, "Please provide pin code."],
  },
  displayName: {
    type: String,
    required: [true, "Please provide an display name."],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide an username."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minLength: 6,
  },
  calendlyUsername: {
    type: String,
    unique: true,
    required: [true, "Please provide Calendly Username."],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  resume: {
    type: String,
    required: [true, "Please provide an resume."],
  },
  profilePicture: {
    type: String,
    required: [true, "Please provide an profile picture."],
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

ExpertSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

ExpertSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

ExpertSchema.methods.getSignedJwtToken = function () {
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

ExpertSchema.methods.getResetPasswordToken = function () {
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

const Expert = mongoose.model("Expert", ExpertSchema);

module.exports = Expert;
