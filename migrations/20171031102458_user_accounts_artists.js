
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_accounts_artists', (table) => {
    table.increments();
    table.integer('user_account_id').references('id').inTable('user_accounts').index().onDelete('cascade');
    table.string('artist_name').notNullable().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_accounts_artists');
};
