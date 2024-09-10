import { catchErrors } from "../utils/catchErrors.js";
import userModel from "../models/userModel.js";

export const register = catchErrors(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.create({ email, password });
  console.log(user);

  res.status(201).json({ user });
});
