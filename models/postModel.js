const mongoose = require("mongoose");
const { Comment } = require("./commentModel");
const { User } = require("./userModel");

const Post = mongoose.model(
  "POSTS",
  new mongoose.Schema({
    postId: Number,
    title: String,
    content: String,
    userId: Number,
    likes: [Number],
    comments: [
      { _id: false, commentId: Number, commentText: String, userId: Number },
    ],
  })
);

module.exports = { Post };
