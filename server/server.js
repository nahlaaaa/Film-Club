const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
////////
express()
  ////////////
  .use(morgan("tiny"))
  .use(express.json())
  ////////
  .use(express.static("public"))
  .use(cors())
  //////

  .get("/url", (req, res) => {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US&page=1&include_adult=false&query=Infinity%20pool"
    )
      .then((res) => res.json())
      .then((data) => {
        res.status(200).json(data);
      });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
