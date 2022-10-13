const passport = require("passport");
const { encodePassword } = require("../../utils/password");
const { generateToken, decodeToken } = require("../../utils/token");
const route = require("express").Router();
const User = require("../models/userModel");

// For testing passport
route.get("/status", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "ok",
  });
});

route.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  (req, res) => {
    try {
      res.json({
        body: req.body,
      });
    } catch (error) {
      res.json({
        error: error.stack,
      });
    }
  }
);

route.post("/register", async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: encodePassword(req.body.password),
      email: req.body.email,
    });

    const token = generateToken(user?._id);

    res.setHeader("Authorization", token);

    res.status(200).json({ status: success });
  } catch (error) {
    res.status(500).json({ error });
  }
});

route.get("/profile", async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      status: "success",
      message: "profile page",
    });
  }

  return res.status(501).json({
    status: "failed",
    message: "UnAuthorization",
  });
});

route.get(
  "/secret-jwt",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req?.user) {
      return res.status(200).json({
        status: "success",
        message: "secret page",
      });
    }

    return res.status(501).json({
      status: "failed",
      message: "UnAuthorization",
    });
  }
);

module.exports = route;
