const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");

dotenv.config();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Hostel Management System API",
    version: "1.0.0",
    description: "API documentation for the Hostel Management System",
  },
  servers: [
    {
      url: `http://${process.env.HOST}:${process.env.PORT}/api`,
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.js", "./src/models/*.js"], // Adjust paths as necessary
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
