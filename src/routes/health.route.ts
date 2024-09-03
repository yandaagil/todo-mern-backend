import { Response, Router } from 'express'

export const HealthRouter: Router = Router()

HealthRouter.get('/', (res: Response) => {
  console.log('Health check success')
  res.status(200).send({ status: '200', message: 'Server is running' })
})
