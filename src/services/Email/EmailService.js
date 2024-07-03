const { transporter } = require("../../config/email/email");
const dotenv = require("dotenv");

dotenv.config();

class EmailService {
  static async generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString().padStart(6, "0");
  }

  static async sendVerificationEmail(email, otp) {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Your verification code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService;
