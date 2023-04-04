require("dotenv").config();
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { CONNECTION_STRING_URI } = process.env;

// :: Movies endpoint

const getFilms = async (req, res) => {
  const { search } = req.query;
  console.log(search);
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US&page=1&include_adult=false&query=${search}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
      // console.log(data);
    });
  return;

  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("Film-Club");
  try {
    await client.connect();
    const films = await db.collection("films").find().toArray();
    if (films) {
      return res
        .status(200)
        .json({ status: 200, data: films, message: "success" });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "failed to retreive films data, please  try again later",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getPopFilms = async (req, res) => {
  fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US&page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    });
  return;
};

const getSingleFilm = async (req, res) => {
  const id = req.params.id;
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    });
  return;
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("concordiadb");
  // const _id = parseInt(req.params._id);
  try {
    await client.connect();
    const filmfound = await db.collection("items").findOne({ id: id });
    if (filmfound) {
      return res
        .status(200)
        .json({ status: 200, data: filmfound, message: "success" });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          "failed to retreive items data, please contact the system administrator or try again later",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const postRating = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("Film-Club");
  const {
    movieId,
    rating, //5
    userId,
    movieData,
    review,
    watchlist,
  } = req.body;
  console.log(
    "body info",
    movieId,
    rating, //5
    userId
  );
  // const newRating = req.body;
  try {
    await client.connect();
    console.log("connected!");
    const findResult = await db
      .collection("User-Rating")
      .findOne({ movieId: parseInt(movieId), userId: userId, movieData });
    console.log("findresult", findResult);
    // if (findResult) {
    //   const result = await db.collection("User-Rating").updateOne(req.body);
    //   console.log("result form insert", result);
    //   if (result.modifiedCount > 0) {
    //     return res.json("updated!");
    //   }
    // }
    console.log("rating was not found will insert now");
    const result = await db.collection("User-Rating").insertOne(req.body);
    if (result.acknowledged && result.insertedId) {
      return res.status(200).json({
        status: 200,
        data: result,
        message: "success",
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "failed to insert new rating",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const PostWatchlist = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("Film-Club");
  const { movieId, movieData } = req.body;
  try {
    await client.connect();
    console.log("connected!");
    const findResult = await db
      .collection("Watchlist")
      .findOne({ movieId: parseInt(movieId) });
    console.log("findresult", findResult);
    if (findResult) {
      return res.status(400).json("movie is aleady added to the watchlist");
    }
    console.log("adding to watchlist was not found will insert now");
    const result = await db
      .collection("Watchlist")
      .insertOne({ _id: movieId, movieData: movieData });
    if (result.acknowledged) {
      return res.status(200).json({
        status: 200,
        data: result,
        message: "success",
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "failed to insert watchlist",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const GetWatchlist = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("Film-Club");
  try {
    await client.connect();
    const watchlist = await db.collection("Watchlist").find().toArray();
    if (watchlist) {
      res
        .status(200)
        .json({ status: 200, data: watchlist, message: "success" });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "failed to retreive watchlist, please try again later",
      });
    }
  } catch (err) {
    comsole, log(err);
  }
};

const GetUserData = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("Film-Club");
  try {
    await client.connect();
    const userData = await db.collection("User-Rating").find().toArray();
    if (userData) {
      res.status(200).json({ status: 200, data: userData, message: "success" });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "failed to retreive user data, please try again later",
      });
    }
  } catch (err) {
    comsole, log(err);
  }
};

module.exports = {
  getFilms,
  getPopFilms,
  getSingleFilm,
  postRating,
  GetUserData,
  PostWatchlist,
  GetWatchlist,
};
