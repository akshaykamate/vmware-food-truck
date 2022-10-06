import { QueryResult } from 'pg'
import Database from '../Config/Database'

export class FoodTruck {
  private sql: Database

  constructor() {
    this.sql = new Database()
  }
  async getByDate(date: string): Promise<QueryResult<any> | null> {
    try {
      const query = await this.sql.pool(
        'SELECT id, name FROM "foodTrucks" WHERE date = $1',
        [date]
      )
      return query
    } catch (e) {
      console.error(e)
    }
    return null
  }
  async getByMonth(date: string): Promise<QueryResult<any> | null> {
    const today = new Date(date)
    const start = new Date(today.getFullYear(), today.getMonth(), 1)
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    try {
      const query = await this.sql.pool(
        'SELECT id, name, date FROM "foodTrucks" WHERE date BETWEEN $1 AND $2',
        [start, end]
      )
      return query
    } catch (e) {
      console.error(e)
    }
    return null
  }
  async getById(id: string): Promise<QueryResult<any> | null> {
    try {
      const query = await this.sql.pool(
        'SELECT id, name, date FROM "foodTrucks" WHERE id=$1',
        [parseInt(id)]
      )
      return query
    } catch (e) {
      console.error(e)
    }
    return null
  }
  async add(name: string, date: string, userId: number): Promise<boolean> {
    try {
      const query = await this.sql.pool(
        'INSERT INTO "foodTrucks" (name, date, "createdBy") VALUES($1,$2,$3)',
        [name, date, userId]
      )
      if (query.rowCount == 1) return true
    } catch (e) {
      console.error(e)
    }
    return false
  }
  async editById(id: number, name: string, date: string): Promise<boolean> {
    try {
      const query = await this.sql.pool(
        'UPDATE "foodTrucks" SET name = $1, date = $2 where id = $3',
        [name, date, id]
      )
      if (query.rowCount == 1) return true
    } catch (e) {
      console.error(e)
    }
    return false
  }
}
