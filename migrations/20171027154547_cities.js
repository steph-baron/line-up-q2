
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cities', (table) => {
    table.increments();
    table.string('city_name').notNullable().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities');
};
