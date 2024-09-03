import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import deserializeToken from '../middleware/deserializeToken'
import { routes } from '../routes'

const createServer = () => {
  const app: Application = express()

  // parse body request
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // cors access handler
  app.use(cors())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })

  app.use(deserializeToken)

  routes(app)

  return app
}

export default createServer
