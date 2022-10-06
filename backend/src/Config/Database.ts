import { Client, Pool } from 'pg'

export default class Database {
  private sql: Client | Pool

  constructor(type: string = '') {
    const { PG_USER, PG_HOST, PG_PASSWORD, PG_DATABASE, PG_PORT } = process.env
    const config = {
      user: PG_USER,
      host: PG_HOST,
      database: PG_DATABASE,
      password: PG_PASSWORD,
      port: parseInt(PG_PORT || '5432')
    }
    this.sql = type == 'client' ? new Client(config) : new Pool(config)
    this.sql.connect()
  }

  async client(text: string, values: Array<any> = [], name: string = '') {
    return await this.sql.query({ text, values, name })
  }

  async pool(text: string, values: Array<any> = [], name: string = '') {
    return await this.sql.query({ name, text, values })
  }

  async disconnect() {
    await this.sql.end()
  }
}
