const sgMail = require("@sendgrid/mail");

const sendEmail = (options) => {
  sgMail.setApiKey(process.env.EMAIL_PASSWORD);

  const templates = {
    contactEmail: process.env.CONTACT_TEMPLATE_ID,
    activationEmail: process.env.ACTIVATE_TEMPLATE_ID,
    passwordResetEmail: process.env.RESET_TEMPLATE_ID,
  };

  const msg = {
    to: options.to,
    from: process.env.EMAIL_FROM,
    templateId: templates[options.templateName],
    dynamic_template_data: {
      firstName: options.firstName,
      websiteURL: "https://help-releaf.web.app",
      activationToken: options.activationToken,
      resetToken: options.resetToken,
    },
  };

  // console.log(msg);
  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent");
    }
  });
};

module.exports = sendEmail;
