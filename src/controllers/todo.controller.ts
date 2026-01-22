import { Request, Response } from "express";
import Todo from "../models/todo";
import { AuthRequest } from "../types/express";

// GET ALL TODOS With Auth
export const getTodos = async (req: AuthRequest, res: Response) => {
  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
};

export const createTodo = async (req: AuthRequest, res: Response) => {
  const todo = await Todo.create({
    title: req.body.title,
    completed: false,
    user: req.userId
  });

  res.json(todo);
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
// update todo
export const updateTodo = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;
  const { id } = req.params;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id, user: req.userId },   // 🔐 ownership check
    { title },
    { new: true }
  );

  if (!updatedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(updatedTodo);
};
// toggle completed status
// TOGGLE COMPLETE
export const toggleTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const todo = await Todo.findOne({
    _id: id,
    user: req.userId
  });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.completed = !todo.completed;
  await todo.save();

  res.json(todo);
};
// ________________________________

// GET ALL TODOS (PUBLIC) Without Auth
// export const getTodos = async (_req: Request, res: Response) => {
//   const todos = await Todo.find();
//   res.json(todos);
// };

// // CREATE TODO (PUBLIC)
// export const createTodo = async (req: Request, res: Response) => {
//   const todo = await Todo.create({
//     title: req.body.title,
//     completed: false
//   });

//   res.json(todo);
// };

// // UPDATE TODO TITLE
// export const updateTodo = async (req: Request, res: Response) => {
//   const { title } = req.body;
//   const { id } = req.params;

//   const updatedTodo = await Todo.findByIdAndUpdate(
//     id,
//     { title },
//     { new: true }
//   );

//   if (!updatedTodo) {
//     return res.status(404).json({ message: "Todo not found" });
//   }

//   res.json(updatedTodo);
// };

// // TOGGLE COMPLETE
// export const toggleTodo = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const todo = await Todo.findById(id);
//   if (!todo) {
//     return res.status(404).json({ message: "Todo not found" });
//   }

//   todo.completed = !todo.completed;
//   await todo.save();

//   res.json(todo);
// };

// // DELETE TODO
// export const deleteTodo = async (req: Request, res: Response) => {
//   await Todo.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

