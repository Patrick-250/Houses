const asyncHandler = require("express-async-handler");
const House = require("../schemas/houseSchema");
//create a room
const createHouse = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //check the required info
  if (!name) {
    res.status(400);
    throw new Error("a house name is required");
  }
  //creating the house
  const house = await House.create({
    name,
  });
  res.status(201).json(house);
});

//get all houses
const getAllHouses = asyncHandler(async (req, res) => {
  const houses = await House.find();
  res.status(200).json(houses);
});
//get a post by id
const getHouse = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);
  res.status(200).json(house);
});
//upadate a house
// const updateHouse = asyncHandler(async (req, res) => {
//   //checking if the house we wanna update actually exists on the database
//   const house = await House.findById({ _id: req.params.id });
//   if (!house) {
//     res.status(404);
//     throw new Error("house not found");
//   }
//   const updatedHouse = await Room.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.status(200).json(updatedHouse);
// });

module.exports = {
  createHouse,
  getAllHouses,
  getHouse,
};
