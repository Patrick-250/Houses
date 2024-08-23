const express = require("express");
const router = express.Router();
const {
  createSchedule,
  getRoomSchedules,
  updateShedule,
  deleteSchedule,
} = require("../contrallers/scheduleContraller");
const authHandler = require("../middleware/auth");
//router.use(authHandler);
router.route("/").post(authHandler, createSchedule);
router
  .route("/:id")
  .get(getRoomSchedules)
  .put(authHandler, updateShedule)
  .delete(authHandler, deleteSchedule);
module.exports = router;
