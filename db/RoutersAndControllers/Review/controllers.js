const sequelize = require("sequelize");
const { Review, Movie } = require("../../models");

exports.fetchReview = async (reviewID, next) => {
  try {
    const review = await Review.findByPk(reviewID);
    return review;
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({
      where: {
        name: req.body.movie,
      },
    });
    const newReview = await Review.create({
      description: req.body.description,
      rating: req.body.rating,
      movieID: movie.id,
    });
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};
exports.updateReview = async (req, res, next) => {
  try {
    await req.review.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    await req.review.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.reviewList = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({
      where: {
        name: req.body.movie,
      },
    });
    const movieReviews = await Review.findAll({
      where: {
        movieID: movie.id,
      },
    });
    res.json(movieReviews);
  } catch (error) {
    next(error);
  }
};

exports.averageReview = async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieID);

    const where = { where: { movieID: movie.id } };
    const total = await Review.sum(`rating`, where);
    const count = await Review.count(where);

    const average = Math.round(total / count);

    res.json({ average });
  } catch (error) {
    next(error.message);
  }
};
