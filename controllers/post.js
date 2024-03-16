const { body, validationResult } = require("express-validator");

const Post = require("../models/post");

exports.get = async function (req, res) {
  const allPosts = await Post.find({}, "title author date_created")
    .sort({
      date_created: -1,
    })
    .exec();

  res.json(allPosts);
};

exports.post = [
  body("title").trim().notEmpty().escape(),
  body("body").trim().notEmpty().escape(),
  body("hidden").escape(),
  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.json(errors.array());
      return;
    }

    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      hidden: req.body.hidden,
    });

    await post.save();
    res.json(post);
  },
];
