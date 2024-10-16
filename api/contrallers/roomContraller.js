const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Room = require("../schemas/roomSchema");
const dotenv = require("dotenv").config();
//create a room
const createRoom = asyncHandler(async (req, res) => {
  const { diet, transfer, medicationPlan, number, detail } = req.body;
  //check the required info
  if (!diet || !transfer || !medicationPlan || !number) {
    res.status(400);
    throw new Error("all fields are required are required");
  }
  //creating the room
  const house_id = "66a924d28b45807187bcd06f";
  const room = await Room.create({
    diet,
    transfer,
    medicationPlan,
    number,
    detail,
    house_id,
  });
  res.status(201).json(room);
});

//get all rooms
const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
});
//get a room by its id
const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.status(200).json(room);
});
//get a rooms based on the house id
const getHouseRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find({ house_id: req.params.id });
  res.status(200).json(rooms);
});

//upadate a Room
const updateRoom = asyncHandler(async (req, res) => {
  //check if the user can update the room
  // const { room_id } = req.params.id;
  // const user_id = req.user._id;
  //checking if the room we wanna update actually exists on the database
  console.log(req.user);
  const room = await Room.findById({ _id: req.params.id });
  //restricting the users from updating rooms in houses that they dont belong
  if (req.user.house_ids.includes(room.house_id.toString())) {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRoom);
    
  } else {
    res.status(400).json({
      err: "Sorry! you can't update this room, because you don't have edit capabilities on this house. contact the houses admin for more info",
    });
  }
  if (!room) {
    res.status(404);
    throw new Error("such room does not exist");
  }

  console.log(room.house_id.toString());
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
  getHouseRooms,
  getRoom,
};
