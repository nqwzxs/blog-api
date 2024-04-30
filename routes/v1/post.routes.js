const express = require("express");
const passport = require("passport");
const router = express.Router();

const controller = require("../../controllers/post.controller");

router.get("/", controller.get);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.post,
);

router.get("/:id", controller.get_post);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.edit_post,
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.delete_post,
);

router.get("/:id/comments/", controller.get_comments);

router.post("/:id/comments/", controller.post_comment);

module.exports = router;
