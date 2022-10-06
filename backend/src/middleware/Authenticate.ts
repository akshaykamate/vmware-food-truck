import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../models/User'

export class Authenticate {
  verify(request: any, response: Response, next: NextFunction): any {
    const { authorization } = request.headers
    if (!authorization) return response.sendStatus(401)
    const token = authorization.split(' ')[1]
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret',
      async (err: any, data: any): Promise<any> => {
        if (err) return response.sendStatus(403)
        const user = new User(data.email)
        const dbUser = await user.findByEmail()
        if (dbUser && dbUser.rowCount == 1) request.user = dbUser.rows[0]
        else return response.sendStatus(403)
        next()
      }
    )
  }
}

export default new Authenticate()
