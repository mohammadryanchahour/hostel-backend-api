const express = require("express");
const config = require("./config/config");
const routes = require("./routes/router");
// const { errorHandler } = require("./middlewares");

// Initialize the app
const app = express();

// Middleware setup
app.use(express.json());

// Connect to the database
config.connectDB();

// Define routes
app.use("/api", routes);

config.setupSwagger(app);

// // Error handling middleware
// app.use(errorHandler);

module.exports = app;
