const { Client } = require("pg");


const connectionString =
  "postgres://wauvokty:mmwy-wYJ0I_CAPHtZK2crItAoBdgTumQ@satao.db.elephantsql.com/wauvokty";

const client = new Client(connectionString);

module.exports = client;
