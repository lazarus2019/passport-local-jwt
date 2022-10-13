const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  schemaOptions
);

module.exports = mongoose.model("User", userSchema);
