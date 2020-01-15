const express = require("express");
const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

// Database configuration
const databaseUrl = "scraper";
const collections = ["scrapedData"];
const db = require("../models");


const db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

// use as an API route?
// move to
app.get("/newscrape"), function(req, res){
axios.get("https://www.nytimes.com/").then(function(response) {

    const $ = cheerio.load(response.data);

    $("article").each(function(i, element) {
    
      var result = [];
      
      result.headline = $(element).find("h2").text().trim();
      result.url = 'https://www.nytimes.com' + $(element).find("a").attr("href");
      result.summary = $(element).find("p").text().trim();

      console.log(result)});

  })};

// Retrieve results from mongo
app.get("/all", function(req, res) {
  // Find all notes in the notes collection
  db.notes.find({}, function(error, found) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    else {
      // Otherwise, send json of the notes back to user
      // This will fire off the success function of the ajax request
      res.json(found);
    }
  });
});


// function initialApiRoute () {
//     axios.get("https://www.nytimes.com/").then(function(response) {
    
//         const $ = cheerio.load(response.data);
    
//         $("article").each(function(i, element) {
        
//           var result = [];
          
//           result.headline = $(element).find("h2").text().trim();
//           result.url = 'https://www.nytimes.com' + $(element).find("a").attr("href");
//           result.summary = $(element).find("p").text().trim();
    
//           console.log(result)});
    
//       })}


// Select just one note by an id
app.get("/find/:id", function(req, res) {
  // When searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IdYouWantToFind))

  // Find just one result in the notes collection
  db.notes.findOne(
    {
      // Using the id in the url
      _id: mongojs.ObjectId(req.params.id)
    },
    function(error, found) {
      // log any errors
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the note to the browser
        // This will fire off the success function of the ajax request
        console.log(found);
        res.send(found);
      }
    }
  );
});

// Update just one note by an id
app.post("/update/:id", function(req, res) {
  // When searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IdYouWantToFind))

  // Update the note that matches the object id
  db.notes.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      // Set the title, note and modified parameters
      // sent in the req body.
      $set: {
        title: req.body.title,
        note: req.body.note,
        modified: Date.now()
      }
    },
    function(error, edited) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

// Delete One from the DB
app.get("/delete/:id", function(req, res) {
  // Remove a note using the objectID
  db.notes.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
    function(error, removed) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(removed);
        res.send(removed);
      }
    }
  );
});

// Clear the DB
app.get("/clearall", function(req, res) {
  // Remove every note from the notes collection
  db.notes.remove({}, function(error, response) {
    // Log any errors to the console
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      // Otherwise, send the mongojs response to the browser
      // This will fire off the success function of the ajax request
      console.log(response);
      res.send(response);
    }
  });
});



// Dependencies
