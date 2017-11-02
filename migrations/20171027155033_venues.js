
exports.up = function(knex, Promise) {
  return knex.schema.createTable('venues', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.specificType('address','char(80)').notNullable();
    table.integer('zip_code').notNullable();
    table.boolean('18_and_over').notNullable();
    table.integer('cities_id').notNullable().references('id').inTable('cities').onDelete('cascade');
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('venues');
};
