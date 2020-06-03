import { Request, Response } from 'express'
import knex from '../database/connection'

export const index = async (request: Request, response: Response) => {
  const items = await knex('items').select()

  const serializedItems = items.map((item) => {
    return {
      id: item._id,
      title: item.title,
      imageUrl: `${request.protocol}://${request.get('host')}/static/${
        item.image
      }`,
    }
  })

  return response.json(serializedItems)
}
