import { Request, Response } from 'express'
import knex from '../database/connection'

export const index = async (request: Request, response: Response) => {
  const { city, uf, items } = request.query

  const parsedItems = String(items)
    .split(',')
    .map((item) => Number(item.trim()))

  const points = await knex('points')
    .select('points.*')
    .join('point_items', 'points._id', '=', 'point_items.point_id')
    .whereIn('point_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()

  return response.json(points)
}

export const show = async (request: Request, response: Response) => {
  const point_id = Number(request.params.id)

  const [point] = await knex('points').select().where({ _id: point_id })

  if (!point) {
    return response.status(400).json({ error: 'Point do not exist' })
  }

  const items = await knex('items')
    .select('items.title')
    .join('point_items', 'items._id', '=', 'point_items.item_id')
    .where('point_items.point_id', point_id)

  const serializedItems = items.map((item) => {
    return item.title
  })

  return response.json({ ...point, items: serializedItems })
}

export const create = async (request: Request, response: Response) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = request.body

  try {
    const trx = await knex.transaction()

    const point = {
      image: 'fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const [point_id] = await trx('points').insert(point)

    const pointItems = items.map((item_id: Number) => {
      return {
        item_id,
        point_id,
      }
    })

    await trx('point_items').insert(pointItems)

    await trx.commit()

    return response.status(201).json({ id: point_id, ...point })
  } catch (error) {
    return response.status(500).json(error)
  }
}
