const express = require("express");
const router = express.Router();

router.get("/");

router.post("/");

router.get("/:postId");

router.delete("/:postId");

router.get("/:postId/comments/");

module.exports = router;
