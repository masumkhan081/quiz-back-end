const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const ejslayout = require("express-ejs-layouts");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { client, pool } = require("./database/connection");
//
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(ejslayout);
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//

app.listen(5000, () => {
  console.log("Sever is now listening at port 5000");
});

app.use("", require("./routes/signUp"));
app.use("", require("./routes/signIn"));
app.use("", require("./routes/passReset"));
app.use("", require("./routes/verify"));

// app.use("/", function (req, res, next) {
//   res.sendStatus(200);
//   next();
// });
app.get("/", async function (req, res) {
  const result = await pool.query("SELECT * from users");
  console.log(result.rows);
  res.send(result.rows);
});
app.post("/quizes/add", (req, res) => {
  console.log(JSON.stringify(req.body));
  res.json({ status: JSON.stringify(req.body) });
});
