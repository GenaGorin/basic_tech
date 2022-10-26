const { Schema, model } = require("mongoose");

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: true },
  gender: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = model("User", User);
