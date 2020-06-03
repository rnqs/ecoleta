import Knex from 'knex'

export const up = async (knex: Knex) =>
  knex.schema.createTable('items', (table) => {
    table.increments('_id').primary()
    table.string('title').notNullable()
    table.string('image').notNullable()
  })

export const down = async (knex: Knex) => knex.schema.dropTable('items')
