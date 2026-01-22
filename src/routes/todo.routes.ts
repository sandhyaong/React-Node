import { Router } from "express";
import auth from "../middleware/auth.middleware";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  toggleTodo
} from "../controllers/todo.controller";

const router = Router();

router.use(auth);
router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.patch("/:id/toggle", toggleTodo);
router.delete("/:id", deleteTodo);

export default router;
