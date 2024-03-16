require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongodb = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongodb);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => console.log("server started"));
