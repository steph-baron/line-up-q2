
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_interests', (table) => {
    table.increments();
    table.integer('user_account_id').references('id').inTable('user_accounts').index().onDelete('cascade');
    // table.string('top_genres').notNullable().defaultTo('');
    // table.string('top_artists').notNullable().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_interests');
};
