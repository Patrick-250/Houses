const express = require("express");
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
  getRoom,
} = require("../contrallers/roomContraller");
const authHandler = require("../middleware/auth");
//router.use(authHandler);
router.route("/").post(createRoom).get(getAllRooms);
router
  .route("/:id")
  .get(getRoom)
  .put(authHandler, updateRoom)
  .delete(authHandler, deleteRoom);
module.exports = router;
