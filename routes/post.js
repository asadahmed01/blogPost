const { Post } = require("../models/postModel");

const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("<h1>Welcome to the social media of the future</h1>");
});

//create a post

router.post("/posts/create", async (req, res) => {
  const { postId, title, content, userId, comments, likes } = req.body;
  const post = new Post({
    postId,
    title,
    content,
    userId,
    comments,
    likes,
  });
  try {
    await post.save();
    res.send({ msg: "success.", post: post });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//like and unlike a post

router.put("/posts/:id/like", async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findOne({ postId: Number(id) });
    console.log(post.likes);
    if (!post.likes.includes(req.body.userId)) {
      //console.log(post);
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.send({ msg: "liked!" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

//comment a post

router.put("/posts/:id/reply", async (req, res) => {
  try {
    const post = await Post.findOne({ postId: Number(req.params.id) });
    await Post.updateOne({ $push: { comments: req.body } });
    res.send({ msg: "replied!" });
  } catch (error) {
    res.status(500).send({ msg: "could not save reply" });
  }
});

module.exports = router;
