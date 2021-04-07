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
      res.status(201).json({ token: token });
    }
    res.status(400).json({ message: "Role cannot be admin" });
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

// Get Users List
exports.getUsersList = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const users = await User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });
      res.status(200).json(users);
    }
    res.status(400).json({ message: "Only admin can view users list" });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
exports.getUserByID = async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (req.user.role === "admin") {
      const foundUser = await User.findByPk(userId, {
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });
      res.status(200).json({ foundUser });
    }
    res.status(400).json({ message: "Only admin can view users" });
  } catch (error) {
    const err = new Error("User not found");
    er.status = 404;
    next(err);
  }
};

// Users Friendship
exports.addUser = async (req, res, next) => {
  try {
    const addedUser = await User.findByPk(req.params.userId);
    const relation = await req.user.addContact(addedUser, {
      through: { status: "Pendding" },
    });
    res.json("added");
  } catch (error) {
    next(error);
  }
};
