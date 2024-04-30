const express = require("express");
const passport = require("passport");
const router = express.Router();

const controller = require("../../controllers/comment.controller");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.get,
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.get_comment,
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.delete_comment,
);

module.exports = router;
