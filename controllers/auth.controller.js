const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

exports.login = [
  body("username").trim().notEmpty().escape(),
  body("password").trim().notEmpty().escape(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.status = 400;
        return next(err);
      }

      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        const err = new Error();
        err.status = 401;
        return next(err);
      }

      if (user.password !== req.body.password) {
        const err = new Error();
        err.status = 401;
        return next(err);
      }

      const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
      res.json(token);
    } catch (err) {
      return next(err);
    }
  },
];
