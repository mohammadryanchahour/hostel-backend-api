const app = require("./src/app");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;
const server = `http://${HOST}:${PORT}/api`;
const swaggerUI = `http://${HOST}:${PORT}/api-docs`;

app.listen(PORT, () => {
  console.log(`Server running on => ${server}`);
  console.log(`Swagger UI running on => ${swaggerUI}`);
});
