import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicle: {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    licencePlate: {
      type: String,
      required: true,
    },
    repairDetails: {
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      expectedTime: {
        type: Date,
        required: true,
      },
      completed: {
        type: Boolean,
        required: true,
      },
    },
  },
});

const Task = mongoose.model("Vehicle", taskSchema);

export default Task;
