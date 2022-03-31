const mongoose = require("mongoose");

const Comment = mongoose.model(
  "COMMENTS",
  new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    comment: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  })
);

module.exports = { Comment };
