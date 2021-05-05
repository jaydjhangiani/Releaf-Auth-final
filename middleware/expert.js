const jwt = require("jsonwebtoken");
const Expert = require("../models/Expert");
const ErrorResponse = require("../utils/errorResponse");

exports.expertProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_AUTH);
    const expert = await Expert.findById(decoded.id);

    if (!expert) {
      return next(new ErrorResponse("No Expert found with this id", 404));
    }

    req.expert = expert;

    next();
  } catch (error) {
    console.log("err");
    // return next(new ErrorResponse("Not Authorized to access this route", 401));
  }
};
