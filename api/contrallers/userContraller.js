const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
//const Post = require("../schemas/postSchema");
//create user
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, house_name } = req.body;
  //check the required info
  if (!username || !email || !password || !house_name) {
    res.status(400);
    throw new Error("all the fields are required");
  }
  const house_id =
    house_name === "House 1"
      ? "66a3a4ea688a3fa460f8afed"
      : house_name === "House 2"
      ? "66a3a4f0688a3fa460f8afef"
      : house_name === "House 3"
      ? "66a3a4f5688a3fa460f8aff1"
      : house_name === "House 4"
      ? "66a3a4fb688a3fa460f8aff3"
      : house_name === "House 5"
      ? "66a3a500688a3fa460f8aff5"
      : "66a3a505688a3fa460f8aff7";
  //check if the user already has an account
  const userAvilable = await User.findOne({ email });
  if (userAvilable) {
    res.status(400);
    throw new Error("this email already exists");
  }
  //hash pasword and create the user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    house_id,
    house_name,
    username,
    email,
    password: hashedPassword,
  });
  res.status(200).json(user);
});

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check the required info
  if (!email || !password) {
    res.status(400);
    throw new Error("both email and password are required");
  }
  //check if the user has an account
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(404).json({ err: "incorect email Or password" });
  }
  //verifying user and creating token
  const verified = await bcrypt.compare(password, userExists.password);
  if (!verified) {
    res.status(401).json({ err: "incorrect email Or password" });
  }
  if (userExists && verified) {
    const token = jwt.sign(
      {
        user: {
          username: userExists.username,
          email: userExists.email,
          id: userExists._id,
          house_id: userExists.house_id,
        },
      },
      process.env.SECRET,
      { expiresIn: "1000000000000h" }
    );
    res.status(200).json({ token: token, id: userExists._id });
  }
});
//get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//get a user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  res.status(200).json(user);
});
//update user
const updateUser = asyncHandler(async (req, res) => {
  if (req.user.id.toString() !== req.params.id) {
    res.status(400);
    throw new Error("you can update only your account");
  }
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});
//Search for a user
const searchUser = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("name is required");
  }
  //search for the user whose name starts with the input
  const users = await User.find({
    username: { $regex: `^${name}`, $options: "i" },
  });

  if (!users) {
    res.status(404).json("user not found");
  }
  res.status(200).json(users);
});
//delete user
const deleteUser = asyncHandler(async (req, res) => {
  // if (req.user.id.toString() !== req.params.id) {
  //   res.status(400);
  //   throw new Error("you delete only your account");
  // }
  await User.deleteOne({ _id: req.params.id });
  // await Post.deleteMany({ user_id: req.user.id });
  res.status(200).json({ message: "user has been deleted succesfully" });
});
//current user
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  createUser,
  loginUser,
  deleteUser,
  currentUser,
  updateUser,
  getAllUsers,
  getUser,
  searchUser,
};
