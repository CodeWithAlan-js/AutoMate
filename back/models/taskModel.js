import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ownerDetails: {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
  },
  vehicle: {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    licencePlate: { type: String, required: true },
    repairDetails: {
      diagnostic: { type: String, required: true },
      partToOrder: { type: String },
      ordered: { type: Boolean },
      price: { type: Number },
      expectedTime: { type: Date, required: true },
      completed: { type: Boolean },
    },
  },
});

const Task = mongoose.model("Vehicle", taskSchema);

export default Task;
