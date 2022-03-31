const { Post } = require("../models/postModel");

const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("<h1>Welcome to the social media of the future</h1>");
});

//create a post

router.post("/create", async (req, res) => {
  const { postId, title, content, user, comments, likes } = req.body;
  const post = new Post({
    postId,
    title,
    content,
    userId: user.userId,
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

router.put("/:id/like", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({ postId: id });

    if (!post.likes.includes(req.body.userId)) {
      await Post.updateOne({ $push: { likes: req.body } });
      res.send({ msg: "liked!" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = router;
