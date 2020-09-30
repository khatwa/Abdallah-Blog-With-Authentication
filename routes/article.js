const express = require("express");
const flash = require("express-flash-messages");
const router = express.Router();
const Article = require("../models/articles");
const User = require("../models/users");

//**************** Request targenting  All articles****************
router.get("/article", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      //check if the user authenticated to display articles
      const articles = await Article.find({});
      if (articles) {
        return res.render("articles", {
          articles: articles,
        });
      }

      return console.log("Nothing in the DB");
    } catch (error) {
      console.log({ error });
      res.status(500);
    }
  }

  return res.redirect("/login");
});
//**************** Request targeting Single article*******************

// Add single article Page
router.get("/article/add", (req, res) => {
  if (req.isAuthenticated()) {
    // check authentication
    res.render("add_article");
  }

  res.redirect("/login");
});

// Get single article
router.get("/article/:id", (req, res) => {
  if (req.isAuthenticated()) {
    // check authentication
    const articleId = req.params.id;
    Article.findById(articleId)
      .then((foundArticle) => {
        if (foundArticle) {
          res.render("single_article", {
            article: foundArticle,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/login");
  }
});

// GET Edit article page
router.get("/article/edit/:id", (req, res) => {
  const articleID = req.params.id;
  console.log(articleID);
  Article.findById(articleID)
    .then((foundArticle) => {
      if (foundArticle) {
        res.render("edit_article", {
          article: foundArticle,
        });
      } else {
        console.log("No article matches");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Post article
router.post("/article/add", (req, res) => {
  const { title, content } = req.body;

  const newArticle = new Article();
  newArticle.title = title;
  newArticle.content = content;
  // newArticle.author = new User({
  //   username: req.body.username
  // });
  console.log(req.body);
  newArticle.save().catch((err) => {
    if (err) {
      console.log(err);
    }
  });
  req.flash("success", "Added successfully!");
  res.redirect("/article");
});

// Update article Request
router.patch("/article/edit/:id", (req, res) => {
  const articleID = req.params.id;
  update = req.body;
  Article.findByIdAndUpdate(articleID, update, {
    useFindAndModify: false,
    new: true,
  })
    .then((newDoc) => {
      if (newDoc) console.log(newDoc);
      res.send("voila");
    })
    .catch((err) => {
      console.log(err);
    });
});
// Delete Request
router.delete("/article/delete/:id", (req, res) => {
  const articleID = req.params.id;
  console.log(articleID);
  Article.findByIdAndDelete(articleID)
    .then((deletedItem) => {
      if (deletedItem) {
        console.log(deletedItem);
        res.send("Got deleted..");
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
