import { catchErrors } from "../utils/catchErrors.js";
import taskModel from "../models/taskModel.js";
import { io } from "../server.js";

export const addTask = catchErrors(async (req, res) => {
  const { vehicle, ownerDetails } = req.body;
  const user = req.user._id;

  if (
    !ownerDetails ||
    !ownerDetails.lastName ||
    !ownerDetails.firstName ||
    !ownerDetails.phone
  ) {
    return res.status(400).json({
      message: "All fields in ownerDetails are required",
    });
  }

  if (
    !vehicle ||
    !vehicle.brand ||
    !vehicle.model ||
    !vehicle.licencePlate ||
    !vehicle.repairDetails ||
    !vehicle.repairDetails.diagnostic ||
    !vehicle.repairDetails.expectedTime ||
    vehicle.repairDetails.completed === undefined
  ) {
    return res.status(400).json({
      message: "All fields in vehicle and repairDetails are required",
    });
  }

  const task = new taskModel({
    user,
    ownerDetails: {
      lastName: ownerDetails.lastName,
      firstName: ownerDetails.firstName,
      phone: ownerDetails.phone,
    },
    vehicle: {
      brand: vehicle.brand,
      model: vehicle.model,
      licencePlate: vehicle.licencePlate,
      repairDetails: {
        diagnostic: vehicle.repairDetails.diagnostic,
        ordered: vehicle.repairDetails.ordered || false,
        price: vehicle.repairDetails.price || null,
        expectedTime: vehicle.repairDetails.expectedTime,
        completed: vehicle.repairDetails.completed || false,
      },
    },
  });

  await task.save();

  io.emit("newTask", task);
  return res.status(201).json({ message: "Task created successfully", task });
});

export const getTasks = catchErrors(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "You need to be logged in" });
  }
  const user = req.user._id;
  const tasks = await taskModel.find({ user });

  res.status(200).json({ tasks });
});

export const updateTask = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { vehicle, ownerDetails } = req.body;

  const task = await taskModel.findById(id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (
    ownerDetails &&
    (!ownerDetails.lastName || !ownerDetails.firstName || !ownerDetails.phone)
  ) {
    return res.status(400).json({
      message: "All fields in ownerDetails are required",
    });
  }

  if (
    vehicle &&
    (!vehicle.brand ||
      !vehicle.model ||
      !vehicle.licencePlate ||
      !vehicle.repairDetails ||
      !vehicle.repairDetails.diagnostic ||
      !vehicle.repairDetails.expectedTime ||
      vehicle.repairDetails.completed === undefined)
  ) {
    return res.status(400).json({
      message: "All fields in vehicle and repairDetails are required",
    });
  }

  if (ownerDetails) {
    task.ownerDetails.lastName = ownerDetails.lastName;
    task.ownerDetails.firstName = ownerDetails.firstName;
    task.ownerDetails.phone = ownerDetails.phone;
  }

  if (vehicle) {
    task.vehicle.brand = vehicle.brand;
    task.vehicle.model = vehicle.model;
    task.vehicle.licencePlate = vehicle.licencePlate;
    task.vehicle.repairDetails.diagnostic = vehicle.repairDetails.diagnostic;
    task.vehicle.repairDetails.ordered = vehicle.repairDetails.ordered || false;
    task.vehicle.repairDetails.price = vehicle.repairDetails.price || null;
    task.vehicle.repairDetails.expectedTime =
      vehicle.repairDetails.expectedTime;
    task.vehicle.repairDetails.completed =
      vehicle.repairDetails.completed || false;
  }

  await task.save();

  io.emit("updateTask", task);

  res.status(200).json({ message: "Task updated successfully", task });
});

export const getTask = catchErrors(async (req, res) => {
  const { id } = req.params;
  const task = await taskModel.findById(id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ task });
});

export const deleteTask = catchErrors(async (req, res) => {
  const { id } = req.params;
  const task = await taskModel
    .findById(id)
    .populate("user", "_id")
    .select("user");

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const result = await taskModel.findByIdAndDelete(id);

  if (!result) {
    return res.status(500).json({ message: "Failed to delete task" });
  }

  io.emit("deleteTask", id);

  res.status(200).json({ message: "Task deleted successfully" });
});
