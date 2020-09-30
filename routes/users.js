const express = require('express');

const router = express.Router();

const passport = require('passport');
const userController = require('../controllers/user');

/* GET register page */
router.get('/register', (req, res) => {
  res.render('register');
});

// GET login Page
router.get('/login', (req, res) => res.render('login'));

// Register POST Request, with passport-local-mongoose
router.post('/register', userController.register);

// Login POST Request
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/article');
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
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
