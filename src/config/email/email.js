const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = {
  transporter,
};
