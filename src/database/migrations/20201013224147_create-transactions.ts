import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('converters', column => {
        column.increments('id').primary()
        column.string('source_currency').notNullable()
        column.decimal('source_value', null).notNullable()
        column.string('target_currency').notNullable()
        column.decimal('conversion_rate', null).notNullable()
        column.timestamp('created_at', { precision: 3 }).defaultTo(knex.fn.now())

        column.string('user_id').notNullable()
        column.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('converters')
}

