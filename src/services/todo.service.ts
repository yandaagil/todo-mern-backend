import { Todo } from '../types/todo.type'
import todoModel from '../models/todo.model'

export const addTodoToDB = async (payload: Todo) => {
  return await todoModel.create(payload)
}

export const getTodosFromDB = async (userId: string, search: string = '') => {
  const result = await todoModel
    .find({
      user_id: userId,
      todo: {
        $regex: search,
        $options: 'i'
      }
    })
    .sort({ date: 1 })
  return result
}

export const getTodoById = async (id: string) => {
  const result = await todoModel.findOne({ todo_id: id })
  return result
}

export const updateTodoById = async (id: string, payload: Todo) => {
  const result = await todoModel.findOneAndUpdate({ todo_id: id }, { $set: payload })
  return result
}

export const deleteTodoById = async (id: string) => {
  const result = await todoModel.findOneAndDelete({ todo_id: id })
  return result
}

export const deleteSelectedTodos = async (ids: string[]) => {
  const result = await todoModel.deleteMany({
    todo_id: { $in: ids }
  })
  return result
}
