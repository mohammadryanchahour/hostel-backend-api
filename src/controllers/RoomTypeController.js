const express = require("express");
const router = express.Router();
const RoomType = require("../models/RoomType");

// Create a new room type
router.post("/create-room-type", async (req, res) => {
  const { name } = req.body;
  try {
    const roomType = new RoomType({ name });
    await roomType.save();
    res.status(201).json(roomType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all room types
router.get("/get-room-types", async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.status(200).json(roomTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a room type by ID
router.get("/get-room-type/:id", async (req, res) => {
  try {
    const roomType = await RoomType.findById(req.params.id);
    if (!roomType)
      return res.status(404).json({ error: "Room Type not found" });
    res.status(200).json(roomType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a room type
router.put("/update-room-type/:id", async (req, res) => {
  const { name } = req.body;
  try {
    const roomType = await RoomType.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!roomType)
      return res.status(404).json({ error: "Room Type not found" });
    res.status(200).json(roomType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a room type
router.delete("/delete-room-type/:id", async (req, res) => {
  try {
    const roomType = await RoomType.findByIdAndDelete(req.params.id);
    if (!roomType)
      return res.status(404).json({ error: "Room Type not found" });
    res.status(200).json({ message: "Room Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
