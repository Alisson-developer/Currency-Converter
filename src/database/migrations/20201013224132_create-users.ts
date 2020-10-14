import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('users', column => {
        column.string('id').primary()
        column.string('name')
        column.timestamp('created_at', {precision: 6}).defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('users')
}

