import { catchErrors } from "../utils/catchErrors.js";
import taskModel from "../models/taskModel.js";

export const addTask = catchErrors(async (req, res) => {
  const { vehicle } = req.body;
  const user = req.user._id;

  if (
    !vehicle ||
    !vehicle.brand ||
    !vehicle.model ||
    !vehicle.licencePlate ||
    !vehicle.repairDetails ||
    !vehicle.repairDetails.description ||
    !vehicle.repairDetails.price ||
    !vehicle.repairDetails.expectedTime ||
    vehicle.repairDetails.completed === undefined
  ) {
    return res.status(400).json({
      message: "All fields in vehicle and repairDetails are required",
    });
  }

  const newTask = await taskModel.create({
    user,
    vehicle,
  });

  res.status(201).json({ newTask });
});

export const getTasks = catchErrors(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "You need to be logged in" });
  }
  const user = req.user._id;
  const tasks = await taskModel.find({ user });

  res.status(200).json({ tasks });
});
