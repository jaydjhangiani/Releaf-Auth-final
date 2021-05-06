const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const Parser = require("rss-parser");
const Expert = require("../models/Expert");
const parser = new Parser();

exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "you've got access",
  });
};

exports.getUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token);

  let decoded = jwt.verify(token, process.env.JWT_SECRET_AUTH);

  let _id = decoded.id;

  try {
    const user = await User.findOne({ _id });
    console.log(user);

    if (user) {
      const userDetails = {
        username: user.username,
        typeOfUser: "user",
      };
      res.status(200).json({
        success: true,
        data: userDetails,
      });
    } else {
      return next(new ErrorResponse("Something went wrong!", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.getExpert = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  let decoded = jwt.verify(token, process.env.JWT_SECRET_AUTH);

  let _id = decoded.id;

  try {
    const expert = await Expert.findOne({ _id });

    const expertDetails = {
      displayName: expert.displayName,
      photo: expert.profilePicture,
      username: expert.username,
    };

    if (expert) {
      res.status(200).json({
        success: true,
        data: expertDetails,
      });
    } else {
      return next(new ErrorResponse("Something went wrong!", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.getRss = async (req, res, next) => {
  console.log(req.body);
  const feed = await parser
    .parseURL(req.body.rss)
    .catch((err) => res.status(400).json("Error" + err));

  // console.log(feed)

  let items = [];

  await Promise.all(
    feed.items.map(async (currentItem) => {
      if (items.filter((item) => isEquivalent(item, currentItem)).length <= 0) {
        items.push(currentItem);
      }
    })
  );

  function isEquivalent(a, b) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // if number of properties is different, objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      let propName = aProps[i];

      // if values of same property are not equal, objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
  }
  res.send(items);
};
