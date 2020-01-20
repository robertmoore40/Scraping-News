const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');
const router = require('./router');

var logger = require("morgan");
// var db = require("./models");
// var router = require("./controller/controller.js");


const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(router);

mongoose.connect("mongodb://localhost/db", { useNewUrlParser: true });
console.log("required packages loaded");


const PORT = process.env.PORT || 3000;


// handlebars
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// To be changed in class when we study mongoose more
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db',
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("mongoose is connected")
    
  // })
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/db";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

console.log('express, ports, and database loaded');

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Database Connected");
});

//Create localhost port
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Port # is " + port);
});


// API ROUTES




