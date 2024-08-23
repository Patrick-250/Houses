const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
//create user
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, house_ids } = req.body;
  //check the required info
  if (!username || !email || !password || !Array.isArray(house_ids)) {
    res.status(400);
    throw new Error("all the fields are required");
  }
  //iterate into the house_ids array and push house names to the house_names array
  let house_names = [];
  for (let i = 0; i < house_ids.length; i++) {
    if (house_ids[i] === "66a924b88b45807187bcd065") {
      house_names.push("House 1");
    } else if (house_ids[i] === "66a924c18b45807187bcd067") {
      house_names.push("House 2");
    } else if (house_ids[i] === "66a924c58b45807187bcd069") {
      house_names.push("House 3");
    } else if (house_ids[i] === "66a924ca8b45807187bcd06b") {
      house_names.push("House 4");
    } else if (house_ids[i] === "66a924ce8b45807187bcd06d") {
      house_names.push("House 5");
    } else if (house_ids[i] === "66a924d28b45807187bcd06f") {
      house_names.push("House 6");
    }
  }
  //check if the user already has an account
  const userAvilable = await User.findOne({ email });
  if (userAvilable) {
    res.status(400);
    throw new Error("this email already exists");
  }
  //hash pasword and create the user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    house_ids,
    house_names,
    username,
    email,
    password: hashedPassword,
  });
  res.status(200).json(user);
  console.log(user);
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
          house_ids: userExists.house_ids,
        },
      },
      process.env.SECRET,
      { expiresIn: "1000000000000h" }
    );
    res
      .status(200)
      .json({
        token: token,
        id: userExists._id,
        house_ids: userExists.house_ids,
      });
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
