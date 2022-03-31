const mongoose = require("mongoose");

const User = mongoose.model(
  "USERS",
  new mongoose.Schema({
    userId: Number,
    name: String,
  })
);

module.exports = { User };
