// Imports
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signup, signin, getTokenInfo } = require("./userControllers");

// Sign up route
router.post("/signup", signup);

// Sign in route
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

// Decode token route
router.get(
  "/getTokenInfo",
  passport.authenticate("jwt", { session: false }),
  getTokenInfo
);

module.exports = router;