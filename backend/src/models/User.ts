import { QueryResult } from 'pg'
import Database from '../Config/Database'

export class User {
  private sql: Database
  constructor(
    public email?: string,
    public hashPassword?: string,
    public name?: string,
    public id?: string
  ) {
    this.sql = new Database()
  }
  async findByEmail(): Promise<QueryResult<any> | null> {
    try {
      const query = await this.sql.pool(
        'SELECT id, name, email, "hashPassword" FROM Users WHERE email=$1',
        [this.email]
      )
      return query
    } catch (e) {
      console.error(e)
    }
    return null
  }
  async create(): Promise<boolean> {
    try {
      const query = await this.sql.pool(
        'INSERT INTO Users (name, email, "hashPassword") VALUES($1,$2,$3)',
        [this.name, this.email, this.hashPassword]
      )
      if (query.rowCount == 1) return true
    } catch (e) {
      console.error(e)
    }
    return false
  }
}
