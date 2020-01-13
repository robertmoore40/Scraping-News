const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');

console.log("required packages loaded");

// const db = require('./models');
const PORT = process.env.PORT || 3000;
const app = express();

// handlebars
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// To be changed in class when we study mongoose more
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongoosepractice',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongoose is connected")
    
  })
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoosepractice";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose!");
});

console.log('express, ports, and database loaded');
// app.use(express.static('public'));

axios.get("https://www.nytimes.com/").then(function(response) {

    const $ = cheerio.load(response.data);

    $("article").each(function(i, element) {
    
      var result = [];
      
      result.headline = $(element).find("h2").text().trim();
      result.url = 'https://www.nytimes.com' + $(element).find("a").attr("href");
      result.summary = $(element).find("p").text().trim();

      console.log(result)});

  });