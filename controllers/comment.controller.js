const { param, validationResult } = require("express-validator");

const Comment = require("../models/comment.model");

exports.get = async function (req, res, next) {
  try {
    const allComments = await Comment.find()
      .sort({
        date_created: -1,
      })
      .exec();

    res.json(allComments);
  } catch (err) {
    return next(err);
  }
};

exports.get_comment = [
  param("id").notEmpty().isMongoId(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.status = 400;
        return next(err);
      }

      const comment = await Comment.findById(req.params.id).exec();

      if (!comment) {
        const err = new Error();
        err.status = 404;
        return next(err);
      }

      res.json(comment);
    } catch (err) {
      return next(err);
    }
  },
];

exports.delete_comment = [
  param("id").notEmpty().isMongoId(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.status = 400;
        return next(err);
      }

      const post = await Comment.findById(req.params.id).exec();

      if (!post) {
        const err = new Error();
        err.status = 404;
        return next(err);
      }

      await Comment.deleteOne({ _id: req.params.id });

      res.end();
    } catch (err) {
      return next(err);
    }
  },
];
