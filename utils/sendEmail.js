const sgMail = require("@sendgrid/mail");

const sendEmail = (options) => {
  sgMail.setApiKey(process.env.EMAIL_PASSWORD);

  const msg = {
    to: options.to,
    from: process.env.EMAIL_FROM,
    subject: options.subject,
    html: options.text,
    // templateId: process.env.TEMPLATE_ID,
    // dynamic_template_data: {
    //   name: options.name,
    // },
  };

  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent");
    }
  });
};

module.exports = sendEmail;
