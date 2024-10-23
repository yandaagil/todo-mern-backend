import { Todo } from '../types/todo.type'
import todoModel from '../models/todo.model'

export const addTodoToDB = async (payload: Todo) => {
  return await todoModel.create(payload)
}

export const getTodosFromDB = async () => {
  return await todoModel
    .find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.info('Cannot get todos from DB')
      console.error(error)
    })
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
