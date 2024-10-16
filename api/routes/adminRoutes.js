const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAdmin,
  loginAdmin,
} = require("../contrallers/adminContraller");
//const authHandler = require("../middleware/auth");
router.route("/regester").post(createAdmin);
router.route("/login").post(loginAdmin);
router.route("/:id").get(getAdmin);
module.exports = router;
