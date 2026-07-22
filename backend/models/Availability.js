import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return value > this.startTime;
        },
        message: "End time must be after start time.",
      },
    },
    breakStart: {
      type: String,
      default: "",
      trim: true,
    },
    breakEnd: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

export default availabilitySchema;