const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/users");

/* GET register page*/
router.get('/register', function(req, res, next) {
  res.render('register');
});
// GET login Page
router.get("/login", (req, res, next) => {
  res.render("login");
});
// Register POST Request, with passport-local-mongoose
router.post("/register", (req, res) => {
  User.register({
    username: req.body.username
  }, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        User.updateOne({
            _id: user._id
          }, {
            $set: {
              provider: "local",
              email: req.body.username
            }
          },
          (err) => err ? console.log(err) : res.redirect("/article")
        )
      })
    }
  })
});
// Login POST Request
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/article")
  // const user = new User({
  //   username: req.body.username,
  //   password: req.body.password
  // });
  // req.login(user, (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.redirect("/login")
  //   }
  //   passport.authenticate("local")(req, res, () => {
  //     res.redirect("/article")
  //   })
  // })
});
// Logout
router.get("/logout", (req, res)=>{
  req.logout();
  res.redirect("/")
})
module.exports = router;
