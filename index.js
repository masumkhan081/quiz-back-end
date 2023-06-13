const client = require("./connection.js");
const express = require("express");
const bodyParser = require("body-parser");
const ejslayout = require("express-ejs-layouts");
const app = express();

//

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(ejslayout);
//
app.listen(3000, () => {
  console.log("Sever is now listening at port 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/ind.html");
  //   res.render("ind", {});
});

// app.get("/add", (req, res) => {
//   client.query(
//     `INSERT INTO quizes ( quiz_name, payment_status,duration_setting)
//       VALUES('another quiz name -2', 'free','limit-overall')`,
//     (err, result) => {
//       if (!err) {
//         client.query(`Select * from quizes`, (err, result) => {
//           if (!err) {
//             res.send(result.rows);
//           }
//         });
//         client.end;
//       }
//     }
//   );
//   client.end;
// });

app.get("/quizes", (req, res) => {
  client.query(`Select * from quizes`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});
client.connect();
