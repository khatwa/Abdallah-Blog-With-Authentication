require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash-messages")

// Routes path files
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const articlesRoute = require("./routes/article")
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set("trust proxy", 1) // for session setting sth I don't know the heck about it!!!

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Configuring the session middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
console.log("Enviroment variable: " + process.env.SECRET);
// Config passport
app.use(passport.initialize());
app.use(passport.session());
// ****** DB configuration **************
const url = "mongodb+srv://admin-fola:"+process.env.PSW+"@fola.rihps.mongodb.net/wikiDB";
// mongodb+srv://admin-fola:test123@fola.rihps.mongodb.net/wikiDB?retryWrites=true&w=majority
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
};
mongoose.connect(url, options);
const db = mongoose.connection;
// Check DB error
db.on("error", function(err) {
  console.log(err)
});
// Check connection
db.once("open", function() {
  console.log("connected voila!")
});
// Local Strategy, Change: use "createStrategy" instead of "authenticate" and all thanks to passport-local-mongoose
const User = require("./models/users");
passport.use(User.createStrategy());
// use serialize & deserialize for the Cookies
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// Config the flash middleware
app.use(flash());

// Routes middleware
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", articlesRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
