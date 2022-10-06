import { Request, Response } from 'express'

import { FoodTruck } from './../models/FoodTruck'

export class FoodTruckController {
  async getTruckByDate(request: Request, response: Response) {
    console.info('Get food trucks ', request.query)
    const foodTruck = new FoodTruck()
    let date = request.query.date?.toString() || ''
    let month = request.query.month?.toString() || ''
    const list =
      month === 'true'
        ? await foodTruck.getByMonth(date)
        : await foodTruck.getByDate(date)
    const foodTruckList = list && list.rows
    return response.status(200).json({
      status: true,
      message: 'list of food trucks',
      data: foodTruckList
    })
  }
  async addFoodTruck(request: any, response: Response) {
    console.info('add new food truck', request.body)
    const { name, date } = request.body
    const { id } = request.user
    const foodTruck = new FoodTruck()
    if (await foodTruck.add(name, date, id))
      return response
        .status(200)
        .json({ status: true, message: 'food truck create successful' })
    return response
      .status(500)
      .json({ status: false, message: 'Something went wrong' })
  }
  async getTruckById(request: Request, response: Response) {
    console.info('Get food trucks id ', request.params)
    const foodTruck = new FoodTruck()
    const id = request.params.id
    const ft = await foodTruck.getById(id)
    if (ft && ft.rowCount == 1)
      return response.status(200).json({
        status: true,
        message: 'list of food trucks',
        data: ft.rows[0]
      })
    return response
      .status(500)
      .json({ status: false, message: 'Food truck not found' })
  }
  async editFoodTruck(request: Request, response: Response) {
    console.info('edit new food truck', request.body, request.params)
    const foodTruck = new FoodTruck()
    const id = request.params.id
    const { name, date } = request.body

    if (await foodTruck.editById(parseInt(id), name, date))
      return response
        .status(200)
        .json({ status: true, message: 'food truck create successful' })
    return response
      .status(500)
      .json({ status: false, message: 'Something went wrong' })
  }
}

export default new FoodTruckController()
