// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// reservations (DATA)
// =============================================================
var tables = [
  {
    routeName: "tablesOne",
    customerName: "ABC",
    customerPhone: 900-222-2222,
    customerEmail: "fallalalal@gmail.com",
    ID: 1234
  },
  {
    routeName: "tablesTwo",
    customerName: "DEC",
    customerPhone: 777-222-2222,
    customerEmail: "xmas@gmail.com",
    ID: 1234
  },
  {
    routeName: "tablesThree",
    customerName: "JAN",
    customerPhone: 900-555-2222,
    customerEmail: "silentnight@gmail.com",
    ID: 1234
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all tabless
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays a single tables, or returns false
app.get("/api/tables/:tables", function(req, res) {
  var chosen = req.params.tables;

  console.log(chosen);

  for (var i = 0; i < tabless.length; i++) {
    if (chosen === tabless[i].routeName) {
      return res.json(tabless[i]);
    }
  }

  return res.json(false);
});

// Create New tabless - takes in JSON input
app.post("/api/tabless", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newtables = req.body;

  // Using a RegEx Pattern to remove spaces from newtables
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newtables.routeName = newtables.name.replace(/\s+/g, "").toLowerCase();

  console.log(newtables);

  tabless.push(newtables);

  res.json(newtables);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
