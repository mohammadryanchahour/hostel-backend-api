const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: String,
    type: {
      type: String,
      enum: ["girls", "boys"],
    },
    capacity: Number,
    number_of_rooms: Number,
    address: String,
    phone: String,
    email: String,
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    details: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hostel", hostelSchema);
