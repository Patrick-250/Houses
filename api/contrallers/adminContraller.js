
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Admin = require("../schemas/adminSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//create user
const createAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  //check the required info
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all the fields are required");
  }
  //check if the user already has an account
  const userAvilable = await Admin.findOne({ email });
  if (userAvilable) {
    res.status(400);
    throw new Error("this email already exists");
  }
  //hash pasword and create the user
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(200).json(admin);
});

//login user
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  //check the required info
  if (!username || !password) {
    res.status(400);
    throw new Error("both username and password are required");
  }
  //check if the user has an account
  const userExists = await Admin.findOne({ username });
  if (!userExists) {
    res.status(404).json({ err: "invalid credentials" });
  }
  //verifying user and creating token
  const verified = await bcrypt.compare(password, userExists.password);
  if (!verified) {
    res.status(401).json({ err: "invalid credentials" });
  }
  if (userExists && verified) {
    const token = jwt.sign(
      {
        user: {
          username: userExists.username,
          email: userExists.email,
          id: userExists._id,
        },
      },
      process.env.SECRET,
      { expiresIn: "1000000000000h" }
    );
    res.status(200).json({ token: token, id: userExists._id });
  }
});

//get a user
const getAdmin = asyncHandler(async (req, res) => {
  const user = await Admin.findById({ _id: req.params.id });
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  res.status(200).json(user);
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  await User.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "user has been deleted succesfully" });
});

module.exports = {
  createAdmin,
  getAdmin,
  loginAdmin,
};