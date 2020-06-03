import Knex from 'knex'

export const up = async (knex: Knex) =>
  knex.schema.createTable('point_items', (table) => {
    table.increments('_id').primary()
    table.integer('point_id').notNullable().references('_id').inTable('points')
    table.integer('item_id').notNullable().references('_id').inTable('items')
  })

export const down = async (knex: Knex) => knex.schema.dropTable('point_items')
