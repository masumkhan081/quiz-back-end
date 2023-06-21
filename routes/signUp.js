const express = require("express");
const signUpRoutes = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { pool, client } = require("../database/connection");

signUpRoutes.post("/api/auth/signup", (req, res) => {
  console.log("post -> auth/signup...");
  const user_name = req.body.user_name;
  const email = req.body.email;
  const password = req.body.password;

  pool.query(
    `Select * from users where email = '${email}' AND password = '${password}'`,
    (err, result) => {
      if (result) {
        let data = result.rows;
        if (data.length == 0) {
          pool.query(
            `INSERT INTO users ( user_name, email,password,is_admin,is_verified)
             VALUES('${user_name}', '${email}','${password}',false,false)`,
            (err, result) => {
              if (result) {
                // res.sendStatus(201)
                res.json({
                  status: "created",
                  msg: "Registered. Plz verify email and log in",
                });
              }
              if (err) {
                res.json({ status: "error", msg: "Problem creating new user" });
              }
            }
          );
        }
        if (data.length == 1) {
          if (data[0].is_verified) {
            res.json({
              status: "verified",
              msg: "You already registered. You May Log In.",
            });
          } else {
            res.json({
              status: "not-verified",
              msg: "Already registered but not verified.",
            });
          }
        }
      }
      if (err) {
        res.send("error ");
      }
    }
  );
  pool.end;
});

signUpRoutes.get("/auth/signup", (req, res) => {
  console.log("post -> auth/signup...");
  res.send("desrve a signup page");
});

module.exports = signUpRoutes;
