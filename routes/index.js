const express = require("express");
const router = express.Router();

const routes = require(`./${process.env.API_VERSION}`);

router.use(`/${process.env.API_VERSION}`, routes);

module.exports = router;
