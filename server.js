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

// app.get('/scrape', function(req,res){
    console.log('scrape route reached');
    axios.get('https://www.foxnews.com').then(function(response){
    // cheerio time
    var $ = cheerio.load(response.data);
    var results = []
    console.log('cheerio loaded')

    $('li.related-item').each(function (i, element) {
        var title = $(element).text();
        var link = $(element).children().attr('href');

    
    results.push({
        title: title,
        link :link
      })});
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||");
    console.log(results);
    // console.log(headline);
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||");
    

    });
// });

