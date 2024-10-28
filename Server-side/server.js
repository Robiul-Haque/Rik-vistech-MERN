const express = require("express");
// import express from "express";
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("./Src/DB/mongoose");
const Routers = require("./Src/Routers");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
require("dotenv").config();
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Dear!");
});
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "h");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Connect to MongoDB
mongoose();

// Routes
Routers(app);

// const data = [
//   { page: 1, active: false },
//   { page: 1, active: true , t: 1},
//   { page: 1, active: false },
//   { page: 1, active: true , t: 2},
//   { page: 1, active: false },
//   { page: 1, active: true , t: 3},
//   { page: 1, active: true }
// ];

// // Function to divide array into smaller arrays
// function divideArray(array, chunkSize) {
//   const dividedArrays = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//       dividedArrays.push(array.slice(i, i + chunkSize));
//   }
//   return dividedArrays;
// }

// const dividedArrays = divideArray(data, 2); // Divide array into chunks of size 3

// console.log(dividedArrays[dividedArrays.length - 1]);



const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
