const nodemailer = require("nodemailer");
const { Config } = require("../nodemailerConfig");

function sendEmail(emailDetailsConfig) {
  let mailTransporter = nodemailer.createTransport({
    service: Config.SENDER_EMAIL_SERVICE,
    auth: {
      user: Config.SENDER_EMAIL,
      pass: Config.SENDER_EMAIL_PASS,
    },
  });

  let mailDetails = {
    from: Config.SENDER_EMAIL,
    to: emailDetailsConfig.to,
    subject: emailDetailsConfig.subject,
    text: emailDetailsConfig.text,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Failed to sent email.");
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = { sendEmail };
