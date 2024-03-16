const Post = require("../models/post");

exports.get = async function (req, res) {
  const allPosts = await Post.find({}, "title author date_created")
    .sort({
      date_created: -1,
    })
    .exec();

  res.json(allPosts);
};
