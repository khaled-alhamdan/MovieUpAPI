// Imports
const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../../../middlewares/multer");
// Importing movies controllers
const {
  getMoviesList,
  deleteMovie,
  updateMovie,
  getMovieByID,
  addMovie,
  fetchMovie,
} = require("./movieControllers");

// param middlewear
router.param("movieId", async (req, res, next, movieId) => {
  const movie = await fetchMovie(movieId, next);
  if (movie) {
    req.movie = movie;
    next();
  } else {
    const err = new Error("Movie Not Found");
    err.status = 404;
    next(err);
  }
});

// Get movies list
router.get("/", getMoviesList);

// Get movie by ID
router.get("/:movieId", getMovieByID);

// Delete a movie
router.delete(
  "/:movieId",
  passport.authenticate("jwt", { session: false }),
  deleteMovie
);

// Update a movie
router.put(
  "/:movieId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateMovie
);

// Create movie
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  addMovie
);

module.exports = router;
