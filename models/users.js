const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

// Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  provider: String,
  email: String,
});

// Add packages to the schema as plugins
userSchema.plugin(passportLocalMongoose, { usernameField: "username" });
userSchema.plugin(findOrCreate);

// Model
const User = mongoose.model("User", userSchema);

module.exports = User;
