const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    service: "gmail",
    auth: {
      user: "athleteworld00@gmail.com",
      pass: "qurmeviimajqcmqv",
    },
  });
module.exports = transporter;