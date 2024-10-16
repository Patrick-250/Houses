const mongoose = require("mongoose");
const scheduleSchema = mongoose.Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    title: { type: String, required: true },
    description: { type: String },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Schedule", scheduleSchema);
