const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes")
const Router = express.Router()
var bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("at-the-gate/build"));
}

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Send every request to the React app
// Define any API routes before this runs
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "at-the-gate/build", "index.html"));
});

// // Our scraping tools
// // Axios is a promised-based http library, similar to jQuery's Ajax method
// // It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI);

// Routes
// app.use(routes);


app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});