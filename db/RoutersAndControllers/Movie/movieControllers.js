// Connecting database
const { Movie, User } = require("../../models");

// fetch movie controller
exports.fetchMovie = async (movieId, next) => {
  try {
    const movie = Movie.findByPk(movieId);
    return movie;
  } catch (error) {
    next(error);
  }
};

// Get movies list
exports.getMoviesList = async (_, res, next) => {
  try {
    const movies = await Movie.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

// Get movie by ID
exports.getMovieByID = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const foundMovie = await Movie.findByPk(movieId);
    res.status(200).json({ foundMovie });
  } catch (error) {
    const err = new Error("Movie not found");
    er.status = 404;
    next(err);
  }
};

// Add new movie
exports.addMovie = async (req, res, next) => {
  try {
    if (req.user.role !== "viewer") {
      if (req.file) {
        req.body.image = `/media/${req.file.filename}`;
        //   req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      const newMovie = await Movie.create(req.body);
      res.status(201).json(newMovie);
    }
    res.status(400).json({ message: "Viewers can not add movies" });
  } catch (error) {
    next(error);
  }
};

// Update movie
exports.updateMovie = async (req, res, next) => {
  try {
    if (req.user.role !== "viewer") {
      if (req.file) {
        req.body.image = `/media/${req.file.filename}`;
        //   req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      await req.movie.update(req.body);
      res.status(204).json("Movie Info has been updated");
    }
    res.status(400).json({ message: "Viewers can not edit movies" });
  } catch (error) {
    next(error);
  }
};

// Delete movie
exports.deleteMovie = async (req, res, next) => {
  try {
    if (req.user.role !== "viewer") {
      await req.movie.destroy(req.body);
      res.status(204).json("Movie has been deleted");
    }
    res.status(400).json({ message: "Viewers can not delete movies" });
  } catch (error) {
    next(error);
  }
};
