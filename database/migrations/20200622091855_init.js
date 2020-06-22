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

      tbl.integer('creator_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable('steps', tbl => {
      tbl.increments();

      tbl.string('name', 400).notNullable();

      tbl.integer('step_number').unsigned().notNullable();

      //foreign key
      tbl.integer('howto_id')
        .unsigned()
        .notNullable()
        .references('howtos.id')
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