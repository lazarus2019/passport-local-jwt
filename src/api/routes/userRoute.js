const route = require("express").Router();

route.post("/login", (req, res) => {
  try {
    res.json({
        body: req.body
    });
  } catch (error) {
    res.json({
      error: error.stack,
    });
  }
});

module.exports = route;
