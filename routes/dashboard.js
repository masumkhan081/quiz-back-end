const express = require("express");
const dashboardRoute = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { pool, client } = require("../database/connection");

dashboardRoute.get("/dashboard", (req, res) => {
  let obj_result = {};
  pool.query(`SELECT COUNT(*) FROM quizes `, (err, result) => {
    if (result) {
      obj_result.num_quiz = result.rows[0].count;
      pool.query(
        `SELECT COUNT(*) FROM quizes WHERE charge = 0 `,
        (err, result) => {
          if (result) {
            obj_result.num_free_quiz = result.rows[0].count;
            pool.query(
              `SELECT COUNT(*) FROM quizes WHERE charge > 0 `,
              (err, result) => {
                if (result) {
                  obj_result.num_paid_quiz = result.rows[0].count;

                  pool.query(`SELECT COUNT(*) FROM users `, (err, result) => {
                    if (result) {
                      obj_result.num_user = result.rows[0].count;
                      res.json(obj_result);
                      // pool.query(
                      //   `SELECT COUNT(*) FROM users `,
                      //   (err, result) => {
                      //     if (result) {
                      //       obj_result.num_users = result.rows[0].count;
                      //       res.json(obj_result);
                      //     }
                      //     if (err) {
                      //       res.send("error - 4" + err);
                      //     }
                      //   }
                      // );
                    }
                    if (err) {
                      res.send("error - 4" + err);
                    }
                  });
                }
                if (err) {
                  res.send("error - 3" + err);
                }
              }
            );
          }
          if (err) {
            res.send("error - 2 " + err);
          }
        }
      );
    }
    if (err) {
      res.send("error - 1 " + err);
    }
  });
  pool.end;
});

module.exports = dashboardRoute;
