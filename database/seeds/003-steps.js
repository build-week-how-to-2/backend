

exports.seed = function(knex) {
  // Inserts seed entries
  return knex('steps').insert([
    {howto_id: 1, step_number: 1, name: 'make index.js'},
    {howto_id: 1, step_number: 2, name: 'make migrations'},
    {howto_id: 1, step_number: 3, name: 'make seeds'},
    {howto_id: 1, step_number: 4, name: 'become hackerman'}
  ]);
};
