const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

const model = mongoose.model("user", User);

module.exports = model;
