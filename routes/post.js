const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("<h1>Welcome to the social media of the future</h1>");
});

//create a post

router.post("/create", async (req, res) => {
  console.log(req.body);
});

module.exports = router;
