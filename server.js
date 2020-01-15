const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');

var logger = require("morgan");
var db = require("./models");
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Routes

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

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("Connected to Mongoose!");
// });

console.log('express, ports, and database loaded');
// app.use(express.static('public'));


app.listen(PORT, function() {
  console.log("Listening on Port " + PORT);
});
