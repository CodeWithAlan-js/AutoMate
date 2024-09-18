import { catchErrors } from "../utils/catchErrors.js";
import userModel from "../models/userModel.js";
import passport from "../config/passport.js";

export const register = catchErrors(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await userModel.create({ email, password });

  user.password = undefined;

  res.status(201).json({ message: "User created successfully" });
});

export const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const message = info.message || "Authentication failed";
      return res.status(401).json({ message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ user });
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(400).json({ message: "Error logging out" });
    }
  });
  res.status(200).json({ message: "Logged out" });
};
