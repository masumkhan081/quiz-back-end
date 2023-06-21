const express = require("express");
const dashboardRoute = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { pool, client } = require("../database/connection");

dashboardRoute.get("/dashboard", (req, res) => {
  let objResult = {};
  pool.query(`SELECT COUNT(*) FROM quizes `, (err, result) => {
    if (result) {
      let data = result.rows;
      objResult.total_quiz = data;
      pool.query(
        `SELECT COUNT(*) FROM quizes WHERE charge = 0 `,
        (err, result) => {
          if (result) {
            let data2 = result.rows;
            objResult.free_quiz = data2;
            pool.query(
              `SELECT COUNT(*) FROM quizes WHERE charge > 0 `,
              (err, result) => {
                if (result) {
                  let data3 = result.rows;
                  objResult.paid_quiz = data3;
                  res.json({ summary: objResult });
                }
                if (err) {
                  res.send("error -3" + err);
                }
              }
            );
          }
          if (err) {
            res.send("error -2 " + err);
          }
        }
      );
    }
    if (err) {
      res.send("error -1 " + err);
    }
  });
  pool.end;
});

module.exports = dashboardRoute;
