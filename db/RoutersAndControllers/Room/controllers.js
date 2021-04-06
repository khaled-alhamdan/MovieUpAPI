const { Room } = require("../../models");

exports.fetchRoom = async (roomID, next) => {
  try {
    const foundRoom = await Room.findbyPk(roomID);
    return foundRoom;
  } catch (error) {
    next(error);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    if (req.user.role !== "viewer") {
      const newRoom = await Room.create({
        name: req.body.name,
        description: req.body.description,
      });
      res.status(201).json(newRoom);
    }
    res.status(400).json({ message: "Viewers cannot add rooms" });
  } catch (error) {
    next(error);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    if (req.user.role !== "viewer") {
      await req.room.destroy();
      res.status(204).end();
    }
    res.status(400).json({ message: "Viewers cannot update rooms" });
  } catch (error) {
    next(error);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    if (req.user.role !== "viewer") {
      await req.room.update(req.body);
      res.status(204).end();
    }
    res.status(400).json({ message: "Viewers cannot delete rooms" });
  } catch (error) {
    next(error);
  }
};

exports.roomList = async (_, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    res.status(500).json("No Rooms Found");
  }
};
