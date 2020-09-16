const mongoose = require("mongoose");
const userSchema = require("./users").schema;

//Schema
const articleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  // author: userSchema
});
// console.log(articleSchema);

// Model
const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
