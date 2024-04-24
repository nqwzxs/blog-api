const express = require("express");
const router = express.Router();

const controller = require("../controllers/comment");

router.get("/", controller.get);

router.get("/:id", controller.get_comment);

router.delete("/:id", controller.delete_comment);

module.exports = router;
