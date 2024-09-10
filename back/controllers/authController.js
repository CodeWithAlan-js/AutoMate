import { catchErrors } from "../utils/catchErrors.js";
import userModel from "../models/userModel.js";

export const register = catchErrors(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await userModel.create({ email, password });
  console.log(user);

  user.password = undefined;

  res.status(201).json({ user });
});
