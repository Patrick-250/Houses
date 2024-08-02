const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    house_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "House",
      },
    ],
    house_names: {
      type: Array,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
