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
    likes: [{ _id: false, userId: Number }],
    comments: [{ commentId: Number, commentText: String, userId: Number }],
  })
);

module.exports = { Post };
