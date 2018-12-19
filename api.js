var express = require("express");
var router = express.Router();
router.use(express.static("views")); //pääsy mediaan ja styleen

router.get('/', function(req, res) {
  res.render('pages/index');
  });

  router.get("/addmovie", function(req,res) {
    res.render("pages/newmessage");
  });

router.get("/guestbook", function(req, res) {
  //////////////////////////////////////////////

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

        var query = { };
        db.collection(collectionName)
          .find(query)
          .limit(20)

          .toArray(function(err, result) {
            if (err) {
              console.log(err);
              res.status("400").send({ error: err });
            } else if (result.length) {
              //console.log("Found:", result);

              res.render("pages/guestbook", { collection: result });
            } else {
              console.log('No document(s) found with defined "find" criteria!');
              res.status("400").send({ error: "No document(s) found" });
            }
            //Close connection
            client.close();
          });
      } // else {
    } // function
  );
    });

    router.get("/getall", function(req, res) {
      //////////////////////////////////////////////

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

            var query = { };
            db.collection(collectionName)
              .find(query)
              .limit(20)

              .toArray(function(err, result) {
                if (err) {
                  console.log(err);
                  res.status("400").send({ error: err });
                } else if (result.length) {
                  //console.log("Found:", result);

                  res.render("pages/guestbook", { collection: result });
                } else {
                  console.log('No document(s) found with defined "find" criteria!');
                  res.status("400").send({ error: "No document(s) found" });
                }
                //Close connection
                client.close();
              });
          } // else {
        } // function
      );
        });

        //lisättävät tiedot guestbookiin
        router.post("/api/addmovie", function(req,res){

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
                    res.redirect("/newmessage");

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





        router.get("/movie", function(req, res) {
          //////////////////////////////////////////////

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

                var query = {};
                db.collection(collectionName)
                  .find(query)
                  .limit(1)

                  .toArray(function(err, result) {
                    if (err) {
                      console.log(err);
                      res.status("400").send({ error: err });
                    } else if (result.length) {
                      //console.log("Found:", result);

                      res.render("pages/guestbook", { collection: result });
                    } else {
                      console.log('No document(s) found with defined "find" criteria!');
                      res.status("400").send({ error: "No document(s) found" });
                    }
                    //Close connection
                    client.close();
                  });
              } // else {
            } // function
          );
            });


module.exports = router;
