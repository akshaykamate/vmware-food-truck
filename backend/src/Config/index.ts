import { Application, urlencoded, json } from 'express'
import cors from 'cors'
import { config as envConfig } from 'dotenv'

import ApiRouter from './../routes/api/index'

export default class Config {
  constructor(private app: Application) {
    envConfig()
    this.app.use(urlencoded({ extended: true }))
    this.app.use(json())
    this.app.use(
      cors({
        origin: '*',
        methods: 'GET,HEAD,PATCH,POST',
        preflightContinue: false,
        optionsSuccessStatus: 204
      })
    )
    this.app.use('/', ApiRouter.getAll())
  }
}
