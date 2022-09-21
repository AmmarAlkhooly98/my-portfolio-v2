require("dotenv").config();
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let mailerRouter = require("./routes/mailer");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* GET home page. */
app.get("/", (req, res) => res.render("index"));

/* Mailer Routes. */
app.use("/api/v1/mailer", mailerRouter);

module.exports = app;
