require("dotenv").config();
const express = require("express");
const mongoClient = require("mongoose");
const logger = require("morgan");
const userRoute = require("./src/api/routes/userRoute");

const { MONGODB_URI, PORT } = process.env;

mongoClient
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connect database from mongodb"))
  .catch((error) =>
    console.error(`❌ Connect database is failed with error which is ${error}`)
  );

const app = express();

// Middlewares
app.use(logger("dev"));

// parse application/json (express >= 4.16)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", userRoute);

const _PORT = PORT || 5000;

app.listen(_PORT, () => {
  console.log(`Start server with port ${_PORT}`);
});
