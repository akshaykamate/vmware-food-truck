import { Router } from 'express'

import FoodTruckRouter from './FoodTruckRouter'
import AuthRouter from './AuthRouter'

export class Api {
  private router
  constructor() {
    this.router = Router()
  }
  getAll() {
    this.router.use('/api/v1/auth', AuthRouter.getAll())
    this.router.use('/api/v1/food-trucks', FoodTruckRouter.getAll())
    return this.router
  }
}
export default new Api()
