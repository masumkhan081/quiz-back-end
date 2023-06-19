const express = require("express");
const signInRoutes = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const client = require("../database/connection");

//
passport.use(
  new LocalStrategy(function (username, password, done) {
    client.query(
      `Select * from users where email = '${username}' AND password = '${password}'`,
      (err, result) => {
        if (result) {
          let data = result.rows;
          if (data.length == 0) {
            console.log("nothing found");
            return done(null, {
              is_auth: false,
              status: "not-found",
              msg: "No user associated with this pair",
            });
          }
          if (data.length == 1) {
            data = data[0];
            if (data.is_verified) {
              return done(null, {
                is_auth: true,
                is_admin: data.is_admin,
                email: data.email,
                password: data.password,
                is_verified: data.is_verified,
              });
            } else {
              return done(null, {
                is_auth: false,
                status: "not-verified",
                msg: "Account found but not verified",
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
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

signInRoutes.post(
  "/auth/signin",
  passport.authenticate("local"),
  (req, res) => {
    res.send(JSON.stringify(req.user));
  }
);

module.exports = signInRoutes;
