require("dotenv").config();

const express = require("./config/express");
const mongoose = require("./config/mongoose");
const passport = require("./config/passport");

express();
mongoose();
passport();
