import Joi from 'joi'
import { User } from '../types/user.type'

export const createUserValidation = (payload: User) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    name: Joi.string().allow('', null),
    username: Joi.string().required(),
    password: Joi.string().min(5).required()
  })

  return schema.validate(payload)
}

export const createSessionValidation = (payload: User) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(5).required()
  })

  return schema.validate(payload)
}

export const refreshSessionValidation = (payload: User) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })

  return schema.validate(payload)
}
