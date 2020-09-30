const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/users");

/* GET register page*/
router.get("/register", function (req, res, next) {
  res.render("register");
});

// GET login Page
router.get("/login", (req, res, next) => {
  res.render("login");
});

// Register POST Request, with passport-local-mongoose
router.post("/register", async (req, res) => {
  User.register(
    {
      username: req.body.username,
    },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.redirect("/register");
      }

      return passport.authenticate("local")(req, res, async () => {
        await updateOneWithPromise(user.id, req.body.username, res);
      });
    }
  );
});

function updateOneWithPromise(userId, username, res) {
  User.updateOne(
    {
      _id: userId,
    },
    {
      $set: {
        provider: "local",
        email: username,
      },
    },
    (err) => {
      if (err) {
        console.log(err);
        return Promise.reject(err);
      }

      return Promise.resolve(res.redirect("/article"));
    }
  );
}

// Login POST Request
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/article");
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
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
