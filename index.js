const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const postRoute = require("./routes/post");

///////////////////////////////////////////////
dotenv.config();
const app = express();

app.use(express.json({ limit: "500mb" }));
app.use(cors());
app.use(express.static("public"));

app.use("/", postRoute);
const PORT = process.env.PORT || 9000;
app.listen(PORT || 9000, () => {
  console.log(`server running on post ${PORT}`);
});

mongoose.connect(
  `${process.env.CONNECTION_STRING}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connected to mongoDB");
  }
);

//mongoose.set("useFindAndModify", false);
