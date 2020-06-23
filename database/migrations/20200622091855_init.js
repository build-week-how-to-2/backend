exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments(); 
      users
        .string('username', 255)
        .notNullable()
      users.string('email', 255).notNullable().unique();
      users.string('password', 255).notNullable();
      users.string('role', 126).defaultTo('user').notNullable();
    })
    .createTable('howtos', tbl => {
      tbl.increments();

      tbl.string('name', 128).notNullable().index();
      tbl.string('body', 400)
      tbl.string('img', 255)
      tbl.string('cat', 255)
      tbl.integer('upvotes').defaultTo(0);
      tbl.integer('downvotes').defaultTo(0);

      tbl.integer('creator_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
  };
  
exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('steps')
    .dropTableIfExists('howtos')
    .dropTableIfExists('users');
};