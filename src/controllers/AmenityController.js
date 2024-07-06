const express = require("express");
const router = express.Router();
const Amenity = require("../models/Amenity");

// Create a new amenity
router.post("/create-amenity", async (req, res) => {
  const { name } = req.body;
  try {
    const amenity = new Amenity({ name });
    await amenity.save();
    res.status(201).json(amenity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all amenities
router.get("/get-amenities", async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get an amenity by ID
router.get("/get-amenity/:id", async (req, res) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    if (!amenity) return res.status(404).json({ error: "Amenity not found" });
    res.status(200).json(amenity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an amenity
router.put("/update-amenity/:id", async (req, res) => {
  const { name } = req.body;
  try {
    const amenity = await Amenity.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!amenity) return res.status(404).json({ error: "Amenity not found" });
    res.status(200).json(amenity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an amenity
router.delete("/delete-amenity/:id", async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!amenity) return res.status(404).json({ error: "Amenity not found" });
    res.status(200).json({ message: "Amenity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
