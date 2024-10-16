const express = require("express");
const router = express.Router();
const {
  createHouse,
  getAllHouses,
  getHouse,
} = require("../contrallers/houseContraller");
const authHandler = require("../middleware/auth");
//router.use(authHandler);
router.route("/").post(createHouse).get(getAllHouses);
router.route("/:id").get(getHouse);

module.exports = router;
