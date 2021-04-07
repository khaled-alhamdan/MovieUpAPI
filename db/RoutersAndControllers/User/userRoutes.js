// Imports
const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  signup,
  signin,
  getTokenInfo,
  getUsersList,
  getUserByID,
  addUser,
} = require("./userControllers");

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

// Get users route
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsersList
);

// Get user by ID route
router.get(
  "/users/:userId",
  passport.authenticate("jwt", { session: false }),
  getUserByID
);

// Users status
router.put(
  "/users/add/:userId",
  passport.authenticate("jwt", { session: false }),
  addUser
);

module.exports = router;
