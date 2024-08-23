const asyncHandler = require("express-async-handler");
const Schedule = require("../schemas/scheduleSchema");
const Room = require("../schemas/roomSchema");
//create a schedule
const createSchedule = asyncHandler(async (req, res) => {
  const { title, description, startTime, endTime, room_id } = req.body;
  //check the required info
  if (!title || !description || !startTime || !endTime || !room_id) {
    res.status(400);
    throw new Error("all fields are required are required");
  }
  //creating the schedule
  const schedule = await Schedule.create({
    title,
    description,
    startTime,
    endTime,
    room_id,
  });
  res.status(201).json(schedule);
});

//get all schedules by room id
const getRoomSchedules = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find({ room_id: req.params.id });
  if (!schedules) {
    res.status(404).json({ err: "there aren't any schedules yet" });
  }
  res.status(200).json(schedules);
});

//upadate a Schedule
const updateShedule = asyncHandler(async (req, res) => {
  //fetching the room which contains the schedule we wanna update
  const room = await Room.findById({ _id: req.params.id });
  //restricting the users from updating rooms in houses that they dont belong
  if (req.user.house_ids.includes(room.house_id.toString())) {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedSchedule);
  } else {
    res.status(400).json({
      err: "sorry! you cant update this schedule",
    });
  }
  if (!room) {
    res.status(404);
    throw new Error("such room does not exist");
  }

  console.log(room.house_id.toString());
});

//delete a Schedule
const deleteSchedule = asyncHandler(async (req, res) => {
  //fetching the room which contains the schedule we wanna delete
  const room = await Room.findById({ _id: req.params.id });
  //restricting the users from updating schedules in houses that they dont belong
  if (req.user.house_ids.includes(room.house_id.toString())) {
    await Schedule.findByIdAndDelete({ id: req.params.id });
    res.status(200).json({ message: "schedule deleted succesfuly" });
  } else {
    res.status(400).json({
      err: "sorry! you cant delete this schedule",
    });
  }
  if (!room) {
    res.status(404);
    throw new Error("such room does not exist");
  }
});

module.exports = {
  createSchedule,
  getRoomSchedules,
  updateShedule,
  deleteSchedule,
};
