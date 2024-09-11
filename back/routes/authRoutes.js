import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", ensureAuthenticated, logout);

export default router;
