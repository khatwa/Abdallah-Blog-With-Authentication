require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash-messages");

// Routes path files
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const articlesRoute = require("./routes/article");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("trust proxy", 1); // for session setting sth I don't know the heck about it!!!

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Configuring the session middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
console.log("Enviroment variable: " + process.env.SECRET);

// Config passport
app.use(passport.initialize());
app.use(passport.session());

// ****** DB configuration **************
require("./config/database");

// Config the flash middleware
app.use(flash());

// Routes middleware
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", articlesRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
