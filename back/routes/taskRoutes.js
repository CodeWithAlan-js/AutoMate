import router from "./authRoutes.js";
import {
  addTask,
  getTasks,
  updateTask,
  getTask,
  deleteTask,
} from "../controllers/taskController.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";

router.post("/addTask", ensureAuthenticated, addTask);
router.get("/getTasks", ensureAuthenticated, getTasks);
router.put("/updateTask/:id", ensureAuthenticated, updateTask);
router.get("/getTask/:id", ensureAuthenticated, getTask);
router.delete("/deleteTask/:id", ensureAuthenticated, deleteTask);

export default router;
