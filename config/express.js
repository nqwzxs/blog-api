const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const passport = require("passport");
const cors = require("cors");

const routes = require("../routes");

module.exports = function () {
  const app = express();

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress());
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.use(passport.initialize());

  app.use(`/api`, routes);

  // eslint-disable-next-line no-unused-vars
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).end();
  });

  app.use(function (req, res) {
    res.status(404).end();
  });

  app.listen(process.env.PORT || 3000, () => console.log("server started"));
};
