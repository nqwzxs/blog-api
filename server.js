require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const postRouter = require("./routes/post");
const commentController = require("./routes/comment");

const app = express();

const mongodb = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongodb);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", postRouter);
app.use("/comments", commentController);

app.listen(3000, () => console.log("server started"));
