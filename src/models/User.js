const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      enum: ["owner", "staff", "boarder"],
      default: "owner",
    },
    email_verification: {
      otp: { type: String, default: null },
      sent_at: { type: Date, default: null },
      is_verified: { type: Boolean, default: false },
      attempts: {
        type: Number,
        default: 0,
      },
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
