const express = require("express");
const bodyParser = require("body-parser");
const ejslayout = require("express-ejs-layouts");
const app = express();
const cors = require("cors");
const pool = require("./db");
const client = require("./connection.js");
//
app.use(cors());
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
app.get("/hit", (req, res) => {
  res.json({ hit: "u ->  hit" });
});

app.get("/quizes", (req, res) => {
  client.query(`Select * from quizes`, (err, result) => {
    if (!err) {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(result.rows);
    }
  });
  client.end;
});
client.connect();
