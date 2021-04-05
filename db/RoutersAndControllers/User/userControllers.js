// Imports
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

// Sign up controller
exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    if (req.body.role !== "admin") {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      req.body.password = hashedPassword;
      const newUser = await User.create(req.body);
      const payload = {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        age: newUser.age,
        exp: Date.now() + JWT_EXPIRATION_MS,
      };
      const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
      res.status(201).json({ Token: token });
    }
    res.status(400).json({ message: "Role can not be admin" });
  } catch (error) {
    next(error);
  }
};

// Sign in controller
exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    age: user.age,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token: token });
};

// Get Token Info controller
exports.getTokenInfo = (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};
