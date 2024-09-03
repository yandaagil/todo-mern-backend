import { NextFunction, Response } from 'express'

export const requireUser = (res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user) return res.sendStatus(403)
  return next()
}
