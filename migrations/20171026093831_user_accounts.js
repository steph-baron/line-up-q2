
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_accounts', (table) => {
    table.increments(); 
    table.string('firstname').notNullable().defaultTo('');
    table.string('lastname').notNullable().defaultTo('');
    table.date('birthdate').notNullable();
    table.string('city').notNullable().defaultTo('');
    table.string('state').notNullable().defaultTo('');
    table.string('username').notNullable().unique().defaultTo('');
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_accounts');
};
