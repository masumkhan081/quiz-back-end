const express = require("express");
const resetRoutes = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { pool, client } = require("../database/connection");

resetRoutes.post("/api/auth/reset", (req, res) => {
  //
  const user_id = req.body.user_id;
  const user_name = req.body.user_name;
  const email = req.body.email;
  const new_password = req.body.new_password;
  const password = req.body.password;
  //
  res.send("reset using: " + user_id, password, new_password);
});

module.exports = resetRoutes;
