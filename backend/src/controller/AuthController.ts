import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models/User'

export class AuthController {
  constructor() {}

  async login(request: Request, response: Response) {
    console.info('User login', request.body)
    const { email, password } = request.body
    const user = new User(email)
    const userFound = await user.findByEmail()
    if (userFound && userFound.rows.length == 1) {
      const { id, name, email, hashPassword } = userFound.rows[0]
      user.id = id
      user.name = name
      user.email = email
      user.hashPassword = hashPassword
      if (bcrypt.compareSync(password, hashPassword)) {
        return response.status(200).json({
          status: true,
          token: jwt.sign({ id, email }, process.env.JWT_SECRET || 'secret')
        })
      }
    }
    return response
      .status(400)
      .json({ status: false, message: 'invalid email or password' })
  }
  async signup(request: Request, response: Response) {
    console.info('User signup', request.body)
    const { name, email, password } = request.body
    const saltRounds = 8
    const hashPassword = bcrypt.hashSync(password, saltRounds)
    const user = new User(email, hashPassword, name)
    const found = await user.findByEmail()
    if (found && found.rows.length > 0) {
      return response
        .status(400)
        .json({ status: false, message: 'user already exist' })
    } else {
      await user.create()
      return response
        .status(200)
        .json({ status: true, message: 'user create successful' })
    }
  }
}

export default new AuthController()
