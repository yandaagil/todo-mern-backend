import { Application, Router } from 'express'
import { HealthRouter } from './health.route'
import { TodoRouter } from './todo.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/todo', TodoRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
