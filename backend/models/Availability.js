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
      validate: {
        validator: function (value) {
          if (!this.breakStart || !value) {
            return true;
          }
          return (
            this.breakStart < value &&
            this.breakStart >= this.startTime &&
            value <= this.endTime
          );
        },
        message: "Invalid break time.",
      },
    },
  },
  {
    _id: false,
  }
);

export default availabilitySchema;