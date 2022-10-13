require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoClient = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
const userRoute = require("./src/api/routes/userRoute");
require("./src/api/middlewares/passport");

const { MONGODB_URI, PORT, SESSION_SECRET_KEY } = process.env;

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

// Session
app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET_KEY,
    resave: true,
    cookie: {
      maxAge: 1000 * 30, // 30s
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRoute);

const _PORT = PORT || 5000;

app.listen(_PORT, () => {
  console.log(`Start server with port ${_PORT}`);
});
