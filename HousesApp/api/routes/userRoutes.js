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
  searchUser,
} = require("../contrallers/userContraller");
const authHandler = require("../middleware/auth");
router.route("/regester").post(createUser);
router.route("/login").post(loginUser);
router.route("/current").get(authHandler, currentUser);
router.route("/update/:id").put(authHandler, updateUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/").get(getAllUsers);
router.route("/search").post(searchUser);
router.route("/:id").get(getUser);
module.exports = router;
