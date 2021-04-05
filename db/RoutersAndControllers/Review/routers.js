const express = require("express");
const router = express.Router();
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
router.get("/:movieID/reviews", reviewList);
router.post("/:movieID/createReview", createReview);
router.put("/:movieID/:reviewID", updateReview);
router.delete("/:movieID/:reviewID", deleteReview);

module.exports = router;
