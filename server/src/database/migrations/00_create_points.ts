import Knex from 'knex'

export const up = async (knex: Knex) =>
  knex.schema.createTable('points', (table) => {
    table.increments('_id').primary()
    table.string('name').notNullable()
    table.string('image').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
  })

export const down = async (knex: Knex) => knex.schema.dropTable('points')
