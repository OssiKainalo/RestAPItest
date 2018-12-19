var express = require('express'); //ottaa expressin mukaan
var app = express(); //express funktiot muuttujaan
var fs = require("fs"); //antaa seikkailla fileissä

var bodyParser = require("body-parser"); //jäsentelee pyynnöt req.bodya varten
app.use(bodyParser.urlencoded({ extended: true})); // parse application/x-www-form-urlencoded

app.use(express.static("views")); //pääsy mediaan ja styleen

//menee guestbook sivulle
//app.get('/guestbook', function(req,res){
//  var dataset = require("./guests.json");
//  res.render('pages/guestbook', {data: dataset });
//});

//Routes
//http://127.0.0.1:8081/    http://127.0.0.1:8081/about
var indexRoutes = require("./routes");
app.use("/", indexRoutes);

//http://127.0.0.1:8081/api/all    http://127.0.0.1:8081/api/add
var apiRoutes = require("./API");
app.use("/api", apiRoutes);


//lataa ejs moduulin
app.set('view engine', 'ejs');

//home
app.get('/', function(req, res) {
  res.render('pages/index');
  });

  //lisättävät tiedot guestbookiin
app.post("/newmessage", function(req,res){

    const MongoClient = require("mongodb").MongoClient;
    // Connection URL
    //const url = "mongodb://localhost:27017/";
    const url = "mongodb://user:password123@ds026018.mlab.com:26018/ottodb";

    // Database Name
    const dbName = "ottodb";
    const collectionName = "movies";

    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function(err, client) {
        if (err) {
          console.log("Unable to connect to the mongoDB server. Error:", err);
        } else {
          console.log("Connection established to", url);

          const db = client.db(dbName);

          var query = { "title": req.body.title,
                        "year": req.body.year
                      };
          db.collection(collectionName)
            .insertOne(query)
            client.close;
              res.redirect("/api/getall");

  //  var data = require("./guests.json");
    //data.push({
    //  username: req.body.username,
      //country: req.body.country,
      //message: req.body.message,
      //date: new Date()
    //});
  }
  });
  });


  app.listen(8081);
  console.log("8081 is the magic port");


/*//muuntaa jsoniksi
  var jsonStr = JSON.stringify(data);
//kirjoittaa messagen json tiedostoon
  fs.writeFile("guests.json", jsonStr, err => {
    if (err) throw err;
      console.log("New data saved.");
    });
    //lähettää guestbookkiin
    res.writeHead(302, {
      Location: "/guestbook"
    });
    res.end();
});
*/

//jos ei löydä sivua
app.get("*", function(req, res){
  res.send("Can't find the requested page", 404);
});

//npm install express, ejs, mongodb
//db.collection.deleteOne()
//db.collection.updateOne(<filter>, <update>, <options>)
