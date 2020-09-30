const passport = require("passport");
const User = require("../models/users");

exports.register = async (req, res) => {
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
};

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
