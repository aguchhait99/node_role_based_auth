const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const ejs = require("ejs");
const connectDB = require("./app/config/db");
const cookieParser = require("cookie-parser");

const app = express();
connectDB();

// cookie-parser read cokkie
app.use(cookieParser());

// setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create static folder
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/uploads")));

// define router
const apiRoute = require('./app/router/apiRoute')
const adminRoute = require('./app/router/webservices/adminRoute')
app.use(apiRoute)
app.use(adminRoute)

// server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
