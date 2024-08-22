const mongoose = require("mongoose");
const roomSchema = mongoose.Schema(
  {
    house_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "House",
    },
    diet: {
      type: String,
      required: true,
    },
    transfer: {
      type: String,
      required: true,
    },
    medicationPlan: {
      type: String,
      default: "",
    },
    number: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
      default: "Click edit to add more details",
    },
    profilePic: {
      type: String,
      default: "avator.jpeg",
    },
    name: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Room", roomSchema);
