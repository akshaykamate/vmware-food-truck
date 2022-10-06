import { Router } from 'express'

import Authenticate from '../../middleware/Authenticate'
import FoodTruckController from '../../controller/FoodTruckController'

export class FoodTruckRouter {
  private router
  constructor() {
    this.router = Router()
  }
  public getAll() {
    this.router.get(
      '/',
      Authenticate.verify,
      FoodTruckController.getTruckByDate
    )
    this.router.get(
      '/:id',
      Authenticate.verify,
      FoodTruckController.getTruckById
    )
    this.router.post('/', [
      Authenticate.verify,
      FoodTruckController.addFoodTruck
    ])
    this.router.patch(
      '/:id',
      Authenticate.verify,
      FoodTruckController.editFoodTruck
    )
    return this.router
  }
}

export default new FoodTruckRouter()
