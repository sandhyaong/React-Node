import mongoose, { Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

const todoSchema = new mongoose.Schema<ITodo>({
  title: String,
  completed: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model<ITodo>("Todo", todoSchema);


