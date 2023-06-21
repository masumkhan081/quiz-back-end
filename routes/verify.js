const express = require("express");
const verifyRoutes = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { pool, client } = require("../database/connection");

verifyRoutes.get("/api/auth/send-verification", (req, res) => {
  const email = req.body.email;
  const user_id = req.body.user_id;
  res.json({ status: "sent", msg: "logic not written yet", to: email });
});

verifyRoutes.get("/api/auth/verify/:token", (req, res) => {
  const token = req.params.token;
  if ((token = "pokath")) {
    res.json({ status: "verified", msg: "logic not written yet" });
  } else {
    res.json({ status: null, msg: "logic not written yet" });
  }
});

module.exports = verifyRoutes;
