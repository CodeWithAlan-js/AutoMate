import router from "./authRoutes.js";
import { addTask, getTasks } from "../controllers/taskController.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";

router.post("/addTask", ensureAuthenticated, addTask);
router.get("/getTasks", ensureAuthenticated, getTasks);

export default router;
