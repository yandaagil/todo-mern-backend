import Joi from 'joi'
import { Todo } from '../types/todo.type'

export const createTodoValidation = (payload: Todo) => {
  const schema = Joi.object({
    todo_id: Joi.string().required(),
    user_id: Joi.string().required(),
    todo: Joi.string().required(),
    date: Joi.date().required(),
    isCompleted: Joi.bool().allow('', false)
  })

  return schema.validate(payload)
}

export const updateTodoValidation = (payload: Todo) => {
  const schema = Joi.object({
    todo: Joi.string().allow('', null),
    date: Joi.date().allow('', null),
    isCompleted: Joi.bool().allow('', null)
  })

  return schema.validate(payload)
}
