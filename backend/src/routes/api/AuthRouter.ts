import { Router } from 'express'

import AuthController from './../../controller/AuthController'

export class AuthRouter {
  private router
  constructor() {
    this.router = Router()
  }
  public getAll() {
    this.router.post('/login', AuthController.login)
    this.router.post('/signup', AuthController.signup)
    return this.router
  }
}

export default new AuthRouter()
