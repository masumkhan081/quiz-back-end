const express = require("express");
const bodyParser = require("body-parser");
const ejslayout = require("express-ejs-layouts");
const app = express();
// const pool = require("./db");
const client = require("./connection.js");
//
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(ejslayout);
//

app.listen(3000, () => {
  console.log("Sever is now listening at port 3000");
});

app.get("/", (req, res) => {
  res.send("root hit");
});

app.get("/quizes", (req, res) => {
  client.query(`Select * from quizes`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});
client.connect();
