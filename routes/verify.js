const express = require("express");
const verifyRoutes = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const client = require("../database/connection");

verifyRoutes.get("/auth/send-verification", (req, res) => {
  const email = req.body.email;
  const user_id = req.body.user_id;
  res.send("token to be sent to: :" + email);
});

verifyRoutes.get("/auth/verify/:token", (req, res) => {
  const token = req.params.token;
  res.send("token:" + token);
});

module.exports = verifyRoutes;
