const { Router } = require("express");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

const TodoRouter = Router();

TodoRouter.post("/", createTodo);
TodoRouter.get("/", getTodos);
TodoRouter.put("/:id", updateTodo);
TodoRouter.delete("/:id", deleteTodo);

module.exports = { TodoRouter };
