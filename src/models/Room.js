const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  building_id: mongoose.Schema.Types.ObjectId,
  boarder_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  floor_number: Number,
  room_number: String,
  room_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  capacity: Number,
  rent: Number,
  status: {
    type: String,
    enum: ["available", "occupied", "maintenance"],
    default: "available",
  },
});
