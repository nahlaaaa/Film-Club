'use strict';

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

  // .get("api/films", (req, res) => {
    // fetch(
    //   "https://api.themoviedb.org/3/search/movie?api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US&page=1&include_adult=false&query=Infinity%20pool"
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     res.status(200).json(data);
    //   });
  // })

 .get('/', (req, res) => {
    res.send('hello world')
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
