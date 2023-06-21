const express = require("express");
const signInRoutes = express.Router();
const dotenv = require("dotenv");
dotenv.config();
//const passport = require("passport");
//var LocalStrategy = require("passport-local").Strategy;
const { pool, client } = require("../database/connection");

//
// passport.use(
//   new LocalStrategy(function (username, password, done){

//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

signInRoutes.post("/api/auth/signin", (req, res) => {
  //
  console.log("body:  " + JSON.stringify(req.body));
  const email = req.body.email;
  const password = req.body.password;
  console.log(email + " <> " + password);
  //
  pool.query(
    `Select * from users where email = '${email}' AND password = '${password}'`,
    (err, result) => {
      if (result) {
        let data = result.rows;
        if (data.length == 0) {
          console.log("nothing found");
          res.json({
            user: {
              authenticated: false,
              status: "not-found",
              msg: "No user associated with this pair",
            },
          });
        }
        if (data.length == 1) {
          data = data[0];
          if (data.is_verified) {
            res.json({
              user: {
                authenticated: true,
                is_admin: data.is_admin,
                email: data.email,
                password: data.password,
                is_verified: data.is_verified,
              },
            });
          } else {
            res.json({
              user: {
                authenticated: false,
                is_admin: data.is_admin,
                email: data.email,
                password: data.password,
                is_verified: data.is_verified,
                msg: "Account found but not verified",
              },
            });
          }
        }
      }
      if (err) {
        res.send("error ");
      }
    }
  );
  client.end;
});

module.exports = signInRoutes;
