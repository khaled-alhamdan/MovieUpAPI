const express = require("express");
const router = express.Router();
const {
  fetchRoom,
  roomList,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("./controllers");

router.param("roomID", async (req, res, next, roomID) => {
  const room = await fetchRoom(roomID, next);
  if (room) {
    req.room = room;
    next();
  } else {
    const error = new Error("Room Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/rooms", roomList);
router.post("/rooms", createRoom);
router.put("/rooms/:roomID", updateRoom);
router.delete("/rooms/:roomID", deleteRoom);

module.exports = router;
