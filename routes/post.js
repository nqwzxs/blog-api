const express = require("express");
const router = express.Router();

const controller = require("../controllers/post");

router.get("/", controller.get);

router.post("/", controller.post);

router.get("/:id", controller.get_post);

router.delete("/:id", controller.delete_post);

router.get("/:id/comments/", controller.get_comments);

router.post("/:id/comments/", controller.post_comment);

module.exports = router;
