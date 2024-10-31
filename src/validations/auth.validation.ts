import Joi from 'joi'
import { User } from '../types/user.type'

export const createUserValidation = (payload: User) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().allow('', null),
    image: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

export const createSessionValidation = (payload: User) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  })

  return schema.validate(payload)
}

export const refreshSessionValidation = (payload: User) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })

  return schema.validate(payload)
}
