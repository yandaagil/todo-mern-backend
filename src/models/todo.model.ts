import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    todo_id: {
      type: String,
      unique: true
    },
    user_id: {
      type: String,
      required: true
    },
    todo: {
      type: String,
      required: false
    },
    date: {
      type: Date,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const todoModel = mongoose.model('todo', todoSchema)

export default todoModel
