
var express = require("express");
var app = express();

var bodyParser = require("body-parser"); //jäsentelee pyynnöt req.bodya varten
app.use(bodyParser.urlencoded({ extended: true})); // parse application/x-www-form-urlencoded

app.use(express.static("public"));

app.use(express.static("views")); //pääsy mediaan ja styleen

app.set('view engine', 'ejs');

//Routes
//http://127.0.0.1:8081/    http://127.0.0.1:8081/about
var indexRoutes = require("./routes");
app.use("/", indexRoutes);

//http://127.0.0.1:8081/api/all    http://127.0.0.1:8081/api/add
var apiRoutes = require("./API");
app.use("/api", apiRoutes);

app.listen(8081);
console.log("8081 is the magic port");

app.get("*", function(req, res){
  res.send("Can't find the requested page", 404);
});
