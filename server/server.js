"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
////////
express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  ////////////
  .use(cors())
  .use(morgan("tiny"))

  .use(express.static("./server"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  ////////

  .use(require("./routes"))
  //////

  .get("/", (req, res) => {
    res.send("hello world");
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
