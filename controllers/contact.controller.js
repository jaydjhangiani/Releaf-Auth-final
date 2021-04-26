const sgMail = require("@sendgrid/mail");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

exports.sendContactMail = async (req, res, next) => {
  sgMail.setApiKey(process.env.EMAIL_PASSWORD);

  const { email, firstName } = req.body;
  try {
    await sendEmail({
      to: email,
      mame: firstName,
    });

    res.status(200).json({
      success: true,
      data: "email sent!",
    });
  } catch (error) {
    return next(new ErrorResponse("Email Could not be sent!", 500));
  }
};
