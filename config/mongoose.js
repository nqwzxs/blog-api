const mongoose = require("mongoose");

module.exports = function () {
  main().catch((err) => console.log(err));
  async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
  }
};
