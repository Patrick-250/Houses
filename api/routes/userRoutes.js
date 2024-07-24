const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  currentUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} = require("../contrallers/userContraller");
const authHandler = require("../middleware/auth");
router.route("/regester").post(createUser);
router.route("/login").post(loginUser);
router.route("/current").get(authHandler, currentUser);
router.route("/update/:id").put(authHandler, updateUser);
router.route("/delete/:id").delete(authHandler, deleteUser);
router.route("/").get(authHandler, getAllUsers);
router.route("/:id").get(getUser);
module.exports = router;
