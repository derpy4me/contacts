const dotenv = require("dotenv");
dotenv.config();
const swaggerAutogen = require("swagger-autogen")();

const environment = process.env.NODE_ENV || "development";

let schema = ["http"];

if (environment === "production") {
  schema = ["https"];
}

const doc = {
  info: {
    title: "Contacts API",
    description: "An API for Contacts",
  },
  host: process.env.API_URL,
  schemes: schema,
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
