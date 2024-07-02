const express = require("express");
const authRoutes = require("./AuthRoutes");
const userRoutes = require("./UserRoutes");
// const hostelRoutes = require("./hostelRoutes");
// const roomRoutes = require("./roomRoutes");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("App is running");
});
router.use("/auth", authRoutes);
// router.use("/users", userRoutes);
// router.use('/hostels', hostelRoutes);
// router.use('/rooms', roomRoutes);

module.exports = router;
