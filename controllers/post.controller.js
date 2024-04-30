const { body, param, validationResult } = require("express-validator");

const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

exports.get = async function (req, res, next) {
  try {
    const allPosts = await Post.find()
      .sort({
        date_created: -1,
      })
      .exec();

    res.json(allPosts);
  } catch (err) {
    return next(err);
  }
};

exports.post = [
  body("title").trim().notEmpty().escape(),
  body("body").trim().notEmpty().escape(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.status = 400;
        return next(err);
      }

      const post = new Post({
        title: req.body.title,
        body: req.body.body,
      });

      await post.save();
      res.json(post);
    } catch (err) {
      return next(err);
    }
  },
];

exports.get_post = [
  param("id").isMongoId(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.status = 400;
        return next(err);
      }

      const post = await Post.findById(req.params.id).exec();

      if (!post) {
        const err = new Error();
        err.status = 404;
        return next(err);
      }

      if (post.hidden) {
        const err = new Error();
        err.status = 403;
        return next(err);
      }

      res.json(post);
    } catch (err) {
      return next(err);
    }
  },
];

exports.edit_post = [
  param("id").isMongoId(),
  body("title").trim().notEmpty().escape(),
  body("body").trim().notEmpty().escape(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.status = 400;
        return next(err);
      }

      const post = await Post.findById(req.params.id).exec();

      post.title = req.body.title;
      post.body = req.body.body;

      await post.save();
      res.json(post);
    } catch (err) {
      return next(err);
    }
  },
];

exports.post_comment = [
  body("author").trim().notEmpty().escape(),
  body("body").trim().notEmpty().escape(),
  async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error();
      err.status = 400;
      return next(err);
    }

    const post = await Post.findById(req.params.id).exec();

    const comment = new Comment({
      body: req.body.body,
      author: req.body.author,
      post: post,
    });

    await comment.save();

    res.json(comment);
  },
];

exports.get_comments = [
  param("id").isMongoId(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.status = 400;
        return next(err);
      }

      const post = await Post.findById(req.params.id).exec();

      if (!post) {
        const err = new Error();
        err.status = 404;
        return next(err);
      }

      const allPostComments = await Comment.find({
        post: post,
      }).exec();

      res.json(allPostComments);
    } catch (err) {
      return next(err);
    }
  },
];

exports.delete_post = [
  param("id").notEmpty().isMongoId(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.status = 400;
        return next(err);
      }

      const post = await Post.findById(req.params.id).exec();

      if (!post) {
        const err = new Error();
        err.status = 404;
        return next(err);
      }

      await Post.deleteOne({ _id: req.params.id });
      await Comment.deleteMany({ post: req.params.id });

      res.end();
    } catch (err) {
      return next(err);
    }
  },
];
