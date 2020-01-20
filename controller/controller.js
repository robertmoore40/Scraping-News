var express = require("express");
var router = express.Router();
var path = require("path");

var cheerio = require("cheerio");

var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");


router.get("/", function(req, res) {
    res.send("Hello World")
  });


router.get("/test", function(req, res) {
    res.send("This is a test")
  });
  
  
router.get("/scrape"), function(req, res){
    axios.get("https://www.nytimes.com/").then(function(response) {
    
        const $ = cheerio.load(response.data);
        console.log('cheerio loaded')
    
        $("article").each(function(i, element) {
        
          var result = [];
          
          result.headline = $(element).find("h2").text().trim();
          result.url = 'https://www.nytimes.com' + $(element).find("a").attr("href");
          result.summary = $(element).find("p").text().trim();
    
          console.log(result)});  
            res.send(results);
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
              .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
                res.send("Scrape Complete");
              })
              .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
              });
          });
        };

module.exports = router;
  
  