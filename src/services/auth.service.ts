import userModel from '../models/user.model'
import { User } from '../types/user.type'

export const createUser = async (payload: User) => {
  return await userModel.create(payload)
}

export const findUserByUsername = async (username: string) => {
  return await userModel.findOne({ username })
}
