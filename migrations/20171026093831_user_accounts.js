
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_accounts', (table) => {
    table.increments();
    table.string('First name').notNullable().defaultTo('');
    table.string('Last name').notNullable().defaultTo('');
    table.date('Birthdate').notNullable();
    table.string('City').notNullable().defaultTo('');
    table.string('username').notNullable().unique().defaultTo('');
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.specificType('Email', 'char(40)').notNullable();
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_accounts');
};
