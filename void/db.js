const dotenv = require("dotenv").config();
const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.connect((err) => {
  if (err) {
  } else {
    console.log("conected successfully");
  }
});

module.exports = pool;
