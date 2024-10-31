import { Router } from 'express'
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todo.controller'
import { requireUser } from '../middleware/auth'

export const TodoRouter: Router = Router()

TodoRouter.get('/', requireUser, getTodos)
TodoRouter.post('/', requireUser, createTodo)
TodoRouter.put('/:id', requireUser, updateTodo)
TodoRouter.delete('/:id', requireUser, deleteTodo)
