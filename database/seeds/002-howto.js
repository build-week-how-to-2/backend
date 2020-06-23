

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('howtos').insert([
        {
          creator_id: 1,
          name: 'how to make a database',
          body: 'make an index.js file, make profit'
        }
  ]);
};
