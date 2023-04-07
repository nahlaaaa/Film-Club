const router = require("express").Router();
const {
  getFilms,
  getPopFilms,
  getSingleFilm,
  postRating,
  PostWatchlist,
  GetWatchlist,
  GetUserData,
  patchUserData,
  deleteWatchlist,
  deleteUserData,
  getTrailer,
  getDrama,
  getTheatres,
  getKids,
  getScienceFiction,
  getComedy,
} = require("./handlers");
// movies endpoints
router.get("/api/films", getFilms);
router.get("/api/popfilms", getPopFilms);
router.get("/api/film/:id", getSingleFilm);
router.post("/api/rating", postRating);
router.get("/api/gettrailer/:movieId", getTrailer);
router.get("/api/drama", getDrama);
router.get("/api/theatres", getTheatres);
router.get("/api/kids", getKids);
router.get("/api/sf", getScienceFiction);
router.get("/api/comedy", getComedy);
// watchlist endpoints
router.post("/api/watchlist", PostWatchlist);
router.get("/api/getwatchlist", GetWatchlist);
router.delete("/api/deletewatchlist", deleteWatchlist);
// userInfo endpoints

router.get("/api/profiledata", GetUserData);
router.patch("/api/userdataupdate", patchUserData);
router.delete("/api/deleteinfo", deleteUserData);

router.get("/cats", (req, res) => res.status(200).json("meow"));

module.exports = router;
