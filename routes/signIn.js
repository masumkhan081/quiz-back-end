const express = require("express");
const signInRoutes = express.Router();
const dotenv = require("dotenv");
dotenv.config();
//const passport = require("passport");
//var LocalStrategy = require("passport-local").Strategy;
const client = require("../database/connection");

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
  const email = req.body.email;
  const password = req.body.password;
  //
  client.query(
    `Select * from users where email = '${email}' AND password = '${password}'`,
    (err, result) => {
      if (result) {
        let data = result.rows;
        if (data.length == 0) {
          console.log("nothing found");
          return done(null, {
            authenticated: false,
            status: "not-found",
            msg: "No user associated with this pair",
          });
        }
        if (data.length == 1) {
          data = data[0];
          if (data.is_verified) {
            return {
              authenticated: true,
              is_admin: data.is_admin,
              email: data.email,
              password: data.password,
              is_verified: data.is_verified,
            };
          } else {
            return {
              authenticated: false,
              status: "not-verified",
              msg: "Account found but not verified",
            };
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
