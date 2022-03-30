const mongoose = require("mongoose");

export const Post = mongoose.model(
  "POSTS",
  new mongoose.Schema({
    _id: false,
    postId: Number,
    title: String,
    content: String,
    userId: User,
    likes: [{ type: Schema.ObjectId, ref: "User" }],
    comments: [{ type: Schema.ObjectId, ref: "Comment" }],
  })
);

export const Comment = mongoose.model(
  "COMMENTS",
  new mongoose.Schema({
    _id: false,
    commentId: Number,
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    comment: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  })
);

export const User = mongoose.model(
  "USERS",
  new mongoose.Schema({
    _id: false,
    userId: Number,
    name: String,
  })
);
