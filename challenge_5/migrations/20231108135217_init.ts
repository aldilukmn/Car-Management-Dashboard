import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table) => {
    table.increments("id");
    table.string("name", 56);
    table.integer("rent");
    table.string("update", 56);
    table.string("size", 12);
    table.text("image");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
