import { Router } from 'express'
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todo.controller'
import { requireUser } from '../middleware/auth'

export const TodoRouter: Router = Router()

TodoRouter.get('/', getTodos)
TodoRouter.post('/', createTodo)
TodoRouter.put('/:id', updateTodo)
TodoRouter.delete('/:id', deleteTodo)
