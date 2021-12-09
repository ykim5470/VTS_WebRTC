const env = process.env.NODE_ENV || "developmentEmail";
const config = require("../../models/config")[env];
var nodemailer = require("nodemailer");
var smtpTransporter = require("nodemailer-smtp-transport");
var fs = require('fs');

var smtpTransport = nodemailer.createTransport(
  smtpTransporter({
    service: config.MAIL_SERVICE,
    host: config.MAIL_HOST,
    secure: false,
    tls: {
      rejectUnauthorize: false,
    },
    auth: {
      user: config.MAIL_USER,
      pass: config.MAIL_PASSWORD,
    },
  })
);

const mail = {
  EmailVerification: (mail, subject, html, attachments) => {
    var mailOption = {
      from: config.MAIL_FROM,
      to: mail,
      subject: subject,
      html: html,
      attachments: attachments,
    };

    smtpTransport.sendMail(mailOption, (err, res) => {
      // 메일을 보내는 코드
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("mail sent!");
    });
  },
};

module.exports = {
  mail,
};
