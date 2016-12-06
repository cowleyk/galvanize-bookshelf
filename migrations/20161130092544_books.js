'use strict';
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('books', (table) => {
    table.increments();
    table.string('author').notNullable().defaultTo('');
    table.string('title').notNullable().defaultTo('');
    table.string('genre').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('cover_url').notNullable().defaultTo('');
    table.timestamps(true, true);
  })
]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.raw('drop table if exists books cascade')
]);
};
