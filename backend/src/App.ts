import express, { Application } from 'express'

import Config from './Config/index'

export default class App {
  private app: Application

  constructor(NODE_ENV: string = 'development', SERVER_PORT: string = '3001') {
    this.app = express()
    try {
      new Config(this.app)
    } catch (error) {
      console.error(error)
    }
    this.setServerEnvironments(NODE_ENV, SERVER_PORT)
  }
  private setServerEnvironments(NODE_ENV: string, SERVER_PORT: string) {
    process.env.NODE_ENV = process.env.NODE_ENV || NODE_ENV
    process.env.SERVER_PORT = process.env.SERVER_PORT || SERVER_PORT
  }
  run() {
    this.app.listen(parseInt(process.env.SERVER_PORT || '3001'), () => {
      console.log(
        `Invoice builder:backend listening at http://localhost:${process.env.SERVER_PORT}`
      )
    })
  }
}
