const connectDB = require("./database/db");
const setupSwagger = require("./openApi/swagger");

const config = {
  connectDB,
  setupSwagger,
};

module.exports = config;
