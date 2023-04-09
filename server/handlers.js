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
  console.log("body info", movieId, rating, userId);

  try {
    await client.connect();
    console.log("connected!");
    const findResult = await db
      .collection("User-Data")
      .findOne({ movieId: parseInt(movieId) });
    console.log("findresult", findResult);
    if (findResult) {
      return res.status(400).json("Movie  has already been rated");
    }
    console.log("rating was not found will insert now");
    const result = await db.collection("User-Data").insertOne(req.body);
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
    console.log(err);
  }
};

const GetUserData = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("Film-Club");
  try {
    await client.connect();
    const userData = await db.collection("User-Data").find().toArray();
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

const patchUserData = async (req, res) => {
  const client = new MongoClient(CONNECTION_STRING_URI, options);
  const db = client.db("Film-Club");
  await client.connect();

  const { review, rating } = req.body;
  if (!review || !rating) {
    return res.status(400).json("no review founded");
  }
  const { movieId } = req.body;
  const newUpdate = { $set: { review, rating } };
  console.log(movieId);
  try {
    const result = await db
      .collection("User-Data")
      .updateOne({ movieId: movieId }, newUpdate);
    console.log(result);
    if (result.matchedCount === 0) {
      res.status(400).json("not found :(");
    } else if (result.modifiedCount === 0) {
      res.status(400).json("nothing was updated");
    } else if (result.matchedCount == 1 && result.modifiedCount == 1) {
      res.status(200).json(newUpdate);
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const deleteWatchlist = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    console.log(req.body);
    const client = new MongoClient(CONNECTION_STRING_URI, options);
    await client.connect();
    const db = client.db("Film-Club");
    await db.collection("Watchlist").deleteOne({
      _id: Number(_id),
    });

    //////
    res.status(200).json("removed");
    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteUserData = async (req, res) => {
  try {
    const { id } = req.body;
    const client = new MongoClient(CONNECTION_STRING_URI, options);
    await client.connect();
    const db = client.db("Film-Club");
    await db.collection("User-Data").deleteOne({
      movieId: Number(id),
    });

    //////
    res.status(200).json("removed");
    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getTrailer = async (req, res) => {
  const { movieId } = req.params;
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let trailer = data.results.filter((video) => {
        return video.type === "Trailer";
      });
      res.status(200).json(trailer);
    });
  return;
};
const getDrama = async (req, res) => {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2014&api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US&page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    });
  return;
};

const getTheatres = async (req, res) => {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US&page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    });
  return;
};

const getKids = async (req, res) => {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US&page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    });
  return;
};

const getScienceFiction = async (req, res) => {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc&api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US&page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    });
  return;
};

const getComedy = async (req, res) => {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=7fc3c9eee3e52dcfbb994c64d2cb42ee&language=en-US&page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    });
  return;
};

module.exports = {
  getFilms,
  getPopFilms,
  getSingleFilm,
  postRating,
  GetUserData,
  PostWatchlist,
  GetWatchlist,
  patchUserData,
  deleteWatchlist,
  deleteUserData,
  getTrailer,
  getDrama,
  getTheatres,
  getKids,
  getScienceFiction,
  getComedy,
};
