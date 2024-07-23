const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Room = require("../schemas/roomSchema");
const dotenv = require("dotenv").config();
//create a room
const createRoom = asyncHandler(async (req, res) => {
  const { diet, transfer, medicationPlan, number } = req.body;
  //check the required info
  if (!diet || !transfer || !medicationPlan || !number) {
    res.status(400);
    throw new Error("all fields are required are required");
  }
  //creating the room
  const room = await Room.create({
    diet,
    transfer,
    medicationPlan,
    number,
    // user_id: req.user.id,
  });
  res.status(201).json(room);
});

//get all rooms
const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
});
//get a post by id
const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.status(200).json(room);
});
//upadate a Room
const updateRoom = asyncHandler(async (req, res) => {
  //checking if the room we wanna update actually exists on the database
  const room = await Room.findById({ _id: req.params.id });
  if (!room) {
    res.status(404);
    throw new Error("such room does not exist");
  }
  const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedRoom);
});

//delete a room
const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById({ _id: req.params.id });
  if (room.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("you can delete only your rooms");
  }
  await Room.findByIdAndDelete({ _id: req.params.id });

  res.status(200).json({ message: "room deleted succesfully" });
});

module.exports = {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
  getRoom,
};
