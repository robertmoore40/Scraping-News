const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');

console.log("required packages loaded");

// const db = require('./models');
const PORT = process.env.PORT || 3000;

const MONGOD_URI = process.env.MONGODB_URI;
const app = express();

console.log('express, ports, and database loaded');
// app.use(express.static('public'));


axios.get("https://www.nytimes.com/").then(function(response) {

    const $ = cheerio.load(response.data);

    $("article").each(function(i, element) {
    
      var result = [];
      
    //   var headline = $(element).find("h2").text().trim();
    //   var url = 'https://www.nytimes.com' + $(element).find("a").attr("href");
    //   var summary = $(element).find("p").text().trim();
      
      result.headline = $(element).find("h2").text().trim();
      result.url = 'https://www.nytimes.com' + $(element).find("a").attr("href");
      result.summary = $(element).find("p").text().trim();


      console.log(result)});

  });