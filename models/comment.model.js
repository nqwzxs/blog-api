const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: { type: String, required: true },
  author: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
