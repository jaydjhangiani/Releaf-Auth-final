const Expert = require("../models/Expert");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

exports.test = async (req, res, next) => {
  console.log("hi");
};

exports.createExpert = async (req, res, next) => {
  console.log("hello");

  const { profilePicture, resume } = req.files;

  const profilePictureUrl = profilePicture[0].path;
  const resumeUrl = resume[0].path;

  const {
    firstName,
    lastName,
    specialization,
    email,
    phoneNumber,
    address,
    city,
    pinCode,
    displayName,
    password,
    calendlyUsername,
    podcastRss,
  } = req.body;

  // console.log(firstName, lastName, specialization, email)

  // console.log(profilePictureUrl, resumeUrl)

  // Just create the Expert Collection now with new Expert({..pass data})
  // My pc is doomed ;(

  try {
    const expert = await Expert.findOne({
      $or: [
        {
          email: email,
        },
        {
          displayName: displayName,
        },
      ],
    });

    if (!expert) {
      try {
        const expert = await Expert.create({
          firstName,
          lastName,
          specialization,
          email,
          phoneNumber,
          address,
          city,
          pinCode,
          displayName,
          password,
          calendlyUsername,
          podcastRss,
          profilePicture: profilePictureUrl,
          resume: resumeUrl,
        });

        if (expert) {
          try {
            await sendEmail({
              to: email,
              templateName: "expertRegistration",
            });

            res.status(200).json({
              success: true,
              data: "email sent!",
            });
          } catch (error) {
            return next(new ErrorResponse("Email Could not be sent!", 500));
          }
        } else {
          return next(new ErrorResponse("User Could Not Be Registered", 500));
        }
      } catch (err) {
        return next(new ErrorResponse(err, 500));
      }
    } else {
      return next(new ErrorResponse("User Already Exists", 409));
    }

    console.log(req.body);
  } catch (error) {
    console.log(error);
    // return next(new ErrorResponse("some error...", 500));
    next(error);
  }
};
