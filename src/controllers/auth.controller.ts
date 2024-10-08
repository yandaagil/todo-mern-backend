import { Request, Response } from 'express'
import { createUserValidation, createSessionValidation, refreshSessionValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { checkPassword, hashing } from '../utils/hashing'
import { createUser, findUserByUsername } from '../services/auth.service'
import { signJWT, verifyJWT } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()

  const { error, value } = createUserValidation(req.body)

  if (error) {
    console.error('ERR: auth - register = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    value.password = `${hashing(value.password)}`

    await createUser(value)
    return res.status(201).json({ status: true, statusCode: 201, message: 'User created successfully' })
  } catch (error) {
    console.error('ERR: auth - register = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    console.error('ERR: auth - create session = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const user: any = await findUserByUsername(value.username)
    const isValid = checkPassword(value.password, user.password)

    if (!isValid) {
      return res.status(401).json({ status: false, statusCode: 401, message: 'Email or password is invalid' })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '1h' })

    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })

    return res
      .status(200)
      .send({ status: true, statusCode: 200, message: 'Login success', data: { accessToken, refreshToken } })
  } catch (error: any) {
    console.error('ERR: auth - create session = ', error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.message })
  }
}

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body)

  if (error) {
    console.error('ERR: auth - refresh session = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const { decoded } = verifyJWT(value.refreshToken)

    const user = await findUserByUsername(decoded._doc.username)
    if (!user) return false

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })

    return res.status(200).send({ status: true, statusCode: 200, message: 'Session refreshed', data: { accessToken } })
  } catch (error: any) {
    console.error('ERR: auth - refresh session = ', error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.message })
  }
}
