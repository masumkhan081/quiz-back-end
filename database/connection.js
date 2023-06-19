const { Client, Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
//
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});
pool.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("pool -> connected ");
});
const client = new Client(process.env.POSTGRES_URL + "?sslmode=require");
// const connectionString =
//   "postgres://wauvokty:mmwy-wYJ0I_CAPHtZK2crItAoBdgTumQ@satao.db.elephantsql.com/wauvokty";
// const client = new Client(connectionString);

module.exports = { client, pool };
