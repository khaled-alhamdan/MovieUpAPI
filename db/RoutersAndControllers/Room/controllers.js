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
    const newRoom = await Room.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    await req.room.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    await req.room.update(req.body);
    res.status(204).end();
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
