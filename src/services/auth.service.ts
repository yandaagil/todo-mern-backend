import userModel from '../models/user.model'
import { User } from '../types/user.type'

export const createUser = async (payload: User) => {
  return await userModel.create(payload)
}

export const findUserByEmail = async (email: string) => {
  return await userModel.findOne({ email })
}
