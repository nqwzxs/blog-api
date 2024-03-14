require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongodb = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongodb);
}

app.listen(3000);
