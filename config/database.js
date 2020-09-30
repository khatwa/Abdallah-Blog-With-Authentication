const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/users");

const url = "mongodb://localhost:27017/blog";
// mongodb+srv://admin-fola:<password>@fola.rihps.mongodb.net/wikiDB?retryWrites=true&w=majority
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.connect(url, options);
const db = mongoose.connection;
// Check DB error
db.on("error", function (err) {
  console.log(err);
});
// Check connection
db.once("open", function () {
  console.log("connected voila!");
});

// Local Strategy, Change: use "createStrategy" instead of "authenticate" and all thanks to passport-local-mongoose
// const User = require("./models/users");
passport.use(User.createStrategy());
// use serialize & deserialize for the Cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
