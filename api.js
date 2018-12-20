var express = require("express");
var router = express.Router();


router.use(express.static("views")); //pääsy mediaan ja styleen

router.get('/', function(req, res) {
  res.render('pages/index');
  });

  router.get("/addmovie", function(req,res) {
    res.render("pages/newmessage");
  });


    router.get("/getall", function(req, res) {
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



//router.post('/', function (req, res){
//  res.send('Got a POST request')
//})

//router.put('/user', function (req, res) {
//  res.send('got a PUT request at /user')
//})

//router.delete('/user', function (req, res) {
//  res.send('Got a PUT request at /user')
//})

        router.get("/movie", function(req, res) {
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

                var query = {"title": "Otto 3"};
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

      //      router.post("/movie", function(req, res) {
        //      var movie = new movie();
          //    movie.name = req.body.name; // set the movie name (comes from the request)

            //  movie.save(function(err) {
              //  if (err) res.send(err);

                //res.json({ message: "movie created!" });
            //  });
          //  });

            //
            // router
            //   .route("/movie")
            //
            //   // create a movie (accessed at POST http://localhost:8080/bears)
            //   .post(function(req, res) {
            //     var movie = new movie(); // create a new instance of the movie model
            //     movie.name = req.body.name; // set the movie name (comes from the request)
            //
            //     movie.save(function(err) {
            //       if (err) res.send(err);
            //
            //       res.json({ message: "movie created!" });
            //     });
            //   })
            //
            //   // get all the bears (accessed at GET http://localhost:8080/api/bears)
            //   .get(function(req, res) {
            //     movie.find(function(err, movie) {
            //       if (err) res.send(err);
            //       res.json(movie);
            //     });
            //   });
            //
            // // on routes that end in /movie/:movie_id
            // // ----------------------------------------------------
            //router
              // .route("/movie/:movie_id")


              //.get(function(req, res) {
              //  movie.findById(req.params.movie_id, function(err, movie) {
                //  if (err) res.send(err);
                  //res.json(movie);
                //});
              // })
            //
            //   // update the movie with this id
            //   .put(function(req, res) {
            //     movie.findById(req.params.movie_id, function(err, movie) {
            //       if (err) res.send(err);
            //
            //       movie.name = req.body.name;
            //       movie.save(function(err) {
            //         if (err) res.send(err);
            //
            //         res.json({ message: "movie updated!" });
            //       });
            //     });
            //   })
            //
            //   // delete the movie with this id
            //   .delete(function(req, res) {
            //     movie.remove(
            //       {
            //         _id: req.params.movie_id
            //       },
            //       function(err, movie) {
            //         if (err) res.send(err);
            //
            //         res.json({ message: "Successfully deleted" });
            //       }
            //     );
            //   });


module.exports = router;
