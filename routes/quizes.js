const express = require("express");
const quizesRoute = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { pool, client } = require("../database/connection");
const obj = require("./renderMaster");

quizesRoute.post("/quizes", (req, res) => {
  //
  const { pagenumb } = req.query;
  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
    console.log(obj.limit + limit + "skip:   " + skip);
  }

  pool.query(`Select * from quizes LIMIT '${skip}'`, (err, result) => {
    if (result) {
      let data = result.rows;
    }
    if (err) {
      res.send("error ");
    }
  });
  pool.end;
});

module.exports = quizesRoute;
