const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');

var logger = require("morgan");
var db = require("./models");

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/db", { useNewUrlParser: true });
console.log("required packages loaded");
const PORT = process.env.PORT || 3000;


// handlebars
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// To be changed in class when we study mongoose more
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongoose is connected")
    
  })
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/db";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

console.log('express, ports, and database loaded');

app.listen(PORT, function() {
  console.log("Listening on Port " + PORT);
});

// API ROUTES

app.get("/newscrape"), function(req, res){
  axios.get("https://www.nytimes.com/").then(function(response) {
  
      const $ = cheerio.load(response.data);
  
      $("article").each(function(i, element) {
      
        var result = [];
        
        result.headline = $(element).find("h2").text().trim();
        result.url = 'https://www.nytimes.com' + $(element).find("a").attr("href");
        result.summary = $(element).find("p").text().trim();
  
        console.log(result)});  
    
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