const express = require("express");
const router = express.Router();
const passport = require("passport");
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

router.get("/", roomList);
router.post("/", passport.authenticate("jwt", { session: false }), createRoom);
router.put(
  "/:roomID",
  passport.authenticate("jwt", { session: false }),
  updateRoom
);
router.delete(
  "/:roomID",
  passport.authenticate("jwt", { session: false }),
  deleteRoom
);

module.exports = router;
