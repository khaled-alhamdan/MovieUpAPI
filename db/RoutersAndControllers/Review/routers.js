const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  fetchReview,
  createReview,
  updateReview,
  deleteReview,
  reviewList,
} = require("./controllers");

router.param("reviewID", async (req, res, next, reviewID) => {
  const review = await fetchReview(reviewID, next);
  if (review) {
    req.review = review;
    next();
  } else {
    const error = new Error("Review Not Found");
    error.status = 404;
    next(error);
  }
});
router.get(
  "/:movieID/reviews",
  passport.authenticate("jwt", { session: false }),
  reviewList
);
router.post(
  "/:movieID/createReview",
  passport.authenticate("jwt", { session: false }),
  createReview
);
router.put(
  "/:movieID/:reviewID",
  passport.authenticate("jwt", { session: false }),
  updateReview
);
router.delete(
  "/:movieID/:reviewID",
  passport.authenticate("jwt", { session: false }),
  deleteReview
);

module.exports = router;
