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

  static async sendInviteEmail(email, token) {
    const inviteLink = `${process.env.CLIENT_DOMAIN}/setup-account?token=${token}`;

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "You are invited to join our platform",
      text: `Please use the following link to create your account: ${inviteLink}`,
    };

    await transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService;
