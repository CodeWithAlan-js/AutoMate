import { catchErrors } from "../utils/catchErrors.js";
import taskModel from "../models/taskModel.js";

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
