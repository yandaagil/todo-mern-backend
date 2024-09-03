import { Request, Response } from 'express'
import { addTodoToDB, getTodosFromDB, updateTodoById, deleteTodoById } from '../services/todo.service'
import { v4 as uuidv4 } from 'uuid'
import { createTodoValidation, updateTodoValidation } from '../validations/todo.validation'

export const createTodo = async (req: Request, res: Response) => {
  req.body.todo_id = uuidv4()

  const { error, value } = createTodoValidation(req.body)

  if (error) {
    console.error('ERR: todo - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }

  try {
    await addTodoToDB(value)
    console.info('Add new todo success')
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Add new todo success'
    })
  } catch (error) {
    console.error('ERR: todo - create = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await getTodosFromDB()
    console.info('Get todos success')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Get todos success',
      data: todos
    })
  } catch (error) {
    console.error('ERR: todo - get = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const updateTodo = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateTodoValidation(req.body)

  if (error) {
    console.error('ERR: todo - update = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }

  try {
    const result = await updateTodoById(id, value)

    if (result) {
      console.log('Update todo success')
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: 'Update todo success'
      })
    } else {
      console.log('Data not found')
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    console.error('ERR: todo - update = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const result = await deleteTodoById(id)

    if (result) {
      console.log('Delete todo success')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Delete todo success'
      })
    } else {
      console.log('Data not found')
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    console.error('ERR: todo - delete = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
