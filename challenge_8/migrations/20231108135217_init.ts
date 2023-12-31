import type { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email', 56)
    table.string('username', 56)
    table.string('password', 255)
    table.text('image_url')
    table.string('role', 56)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('cars', (table) => {
    table.increments('id')
    table.string('name', 56)
    table.integer('rent')
    table.string('size', 12)
    table.text('image_url')
    table.boolean('is_available').defaultTo(true)
    table.string('added_by', 56)
    table.string('created_by', 56)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('updated_by', 56)
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.string('deleted_by', 56)
    table.timestamp('deleted_at').defaultTo(null)
    table.boolean('is_deleted').defaultTo(false)
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('cars')
}
