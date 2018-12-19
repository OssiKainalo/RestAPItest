//var mongoose = require("mongoose");
//require("./models.js");

var url = "mongodb://user:password123@ds026018.mlab.com:26018/ottodb";

// Connecto to db
mongoose.connect(url);
// Use the movie-model created in models.js - no schema definition anymore
var movie = mongoose.model("movie");
// Find all the Cat objects from the database
movie
  .find({})
  .limit(10)
  .then(function(err, result) {
    // in case of errors
    if (err) res.status(404).json(err);
    // if we are ok, show the data with statuscode 200 (OK)
    console.log(result);
    res.status(200).json(result);
  });

///////////////////////////////
