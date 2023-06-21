const express = require("express");
const quizAddRoute = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { pool, client } = require("../database/connection");

quizAddRoute.post("/api/auth/signup", (req, res) => {
  //   const user_name = req.body.user_name;

  pool.query(
    `Select * from users where email = '${email}' AND password = '${password}'`,
    (err, result) => {
      if (result) {
        let data = result.rows;
      }
      if (err) {
        res.send("error ");
      }
    }
  );
  pool.end;
});

 
module.exports = quizAddRoute;
