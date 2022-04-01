const { Post } = require("../models/postModel");

const router = require("express").Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    res.send({ mgs: [] });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const posts = await Post.find({ _id: req.params.id });
    res.send(posts);
  } catch (error) {
    res.status(404).send({ msg: "not found" });
  }
});

//create a post

router.post("/posts/create", async (req, res) => {
  const { title, content, userId, comments, likes } = req.body;
  const post = new Post({
    title,
    content,
    userId,
    comments,
    likes,
  });
  try {
    await post.save();
    res.send({ msg: "success", post: post });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//update a post

router.put("/posts/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({ _id: id });
    console.log(post);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ msg: "the post has been updated" });
    } else {
      res.status(403).json({ msg: "Access Denied!" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//delete a post

router.put("/posts/delete/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (post.userId !== req.body.userId)
      return res.status(403).send({ msg: "access denied." });
    await post.deleteOne();
    res.status(200).json({ msg: "the post has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});
//like and unlike a post

router.put("/posts/like/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findOne({ _id: id });
    console.log(post.likes);
    if (!post.likes.includes(req.body.userId)) {
      //console.log(post);
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).send({ msg: "liked!" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ msg: "disliked" });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

//reply to a post

router.put("/posts/reply/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    await post.updateOne({ $push: { comments: req.body } });
    res.status(200).send({ msg: "replied!" });
  } catch (error) {
    res.status(500).send({ msg: "could not save reply" });
  }
});

//update a reply
router.put("/posts/reply/update/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ "comments._id": req.params.id });
    const temp = post.comments.find((el) => el._id.equals(req.params.id));
    console.log(temp);
    if (temp.userId !== req.body.userId)
      return res.send({ msg: "access denied" });
    await Post.findOneAndUpdate(
      { "comments._id": req.params.id },
      {
        $set: {
          "comments.$.commentText": req.body.commentText,
        },
      }
    );
    res.status(200).send({ msg: "success" });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

//delete a reply

router.put("/posts/reply/delete/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ "comments._id": req.params.id });
    const temp = post.comments.find((el) => el._id.equals(req.params.id));
    console.log(temp);

    if (temp.userId !== req.body.userId)
      return res.send({ msg: "access denied" });

    await Post.findOneAndUpdate(
      { "comments._id": req.params.id },
      { $pull: { comments: { _id: req.params.id } } }
    );
    res.status(200).send({ msg: "reply deleted" });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

module.exports = router;
