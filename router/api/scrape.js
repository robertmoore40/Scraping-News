var router = require("express").Router();
var path = require("path");
var axios = require("axios");

var cheerio = require("cheerio");

var Comment = require("../../models/Comment");
var Article = require("../../models/Article");

router.get("/", function(req, res) {
  res.send("Hello World");
});

router.get("/test", function(req, res) {
  res.send("This is a test");
});

router.get("/newscrape", function(req, res) {
  axios.get("https://www.nytimes.com/").then(function(response) {
    const $ = cheerio.load(response.data);
    console.log("cheerio loaded");

    var result = [];

    $("article").each(function(i, element) {

      var newArticle = {};

      newArticle.headline = $(element)
        .find("h2")
        .text()
        .trim();
      newArticle.url =
        "https://www.nytimes.com" +
        $(element)
          .find("a")
          .attr("href");
      newArticle.summary = $(element)
        .find("p")
        .text()
        .trim();

      console.log(newArticle)

      result.push(newArticle);

    //   res.json({result});

    });

    console.log(result);
    res.json({result})

    /* 
    
        We now have an array of articles
        On each article, run db.Article.create

        var promies = [];
        result.forEach(article => {
            var newSave = new Article({title, link, img_url})
            promises.push(newSave.save())
        })
        Promimse.all(promises).then(function(result) {
            res.json(result)
        }).catch(err => res.json(err))
    */

    // Create a new Article using the `result` object built from scraping
    //   db.Article.create(result)
    //     .then(function(dbArticle) {
    //       // View the added result in the console
    //       console.log(dbArticle);
    //       res.send("Scrape Complete");
    //     })
    //     .catch(function(err) {
    //       // If an error occurred, log it
    //       console.log(err);
    // });
  });
});

module.exports = router;
