const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
  hostel_id: mongoose.Schema.Types.ObjectId,
  name: String,
  address: String,
  numberOfFloors: Number,
  amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});
