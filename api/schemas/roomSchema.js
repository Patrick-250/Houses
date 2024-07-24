const mongoose = require("mongoose");
const roomSchema = mongoose.Schema(
  {
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Room", roomSchema);
