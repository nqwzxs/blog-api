const express = require("express");
const router = express.Router();

const controller = require("../controllers/post");

router.get("/", controller.get);

router.post("/", controller.post);

router.get("/:postId");

router.delete("/:postId");

router.get("/:postId/comments/");

module.exports = router;
