var express = require("express");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "roomies_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.html page with the movies in it.
app.get("/", function(req, res) {
  connection.query("SELECT * FROM users;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { users: data });
  });
});

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "view.html"));
// });

// Create a new movie
// app.post("/users", function(req, res) {
//   connection.query("INSERT INTO users (firstName, lastName, phone, email) VALUES (?, ?, ?,?)", [req.body.firstName], [req.body.lastName], [req.body.phone], [req.body.email], function(err, result) {
//     if (err) {
//       return res.status(500).end();
//     }

//     con.on('error', function(err) {
//       console.log("[mysql error]",err);
//     });

//     // Send back the ID of the new movie
//     // res.json({ users: data });
//     // console.log({ users: data });
//   });
// });

app.post("/users", function(req, res) {
  connection.query("INSERT INTO users (firstName, lastName, phone, email) VALUES ('" + req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.phone + "', '" + req.body.email + "')", function(err, result) {
    if (err) {
      console.log(err)
      return res.status(500).end();
    }

    // con.on('error', function(err) {
    //   console.log("[mysql error]",err);
    // });

    // Send back the ID of the new movie
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Retrieve all movies
// app.get("/movies", function(req, res) {
//   connection.query("SELECT * FROM movies;", function(err, data) {
//     if (err) {
//       return res.status(500).end();
//     }

//     res.json(data);
//   });
// });

// // Update a movie
// app.put("/movies/:id", function(req, res) {
//   connection.query("UPDATE movies SET movie = ? WHERE id = ?", [req.body.movie, req.params.id], function(err, result) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//     else if (result.changedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     }
//     res.status(200).end();

//   });
// });

// // Delete a movie
app.delete("/users/:id", function(req, res) {
  connection.query("DELETE FROM users WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
