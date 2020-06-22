
exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'john',
      password: '$2y$08$RHinL8j6xUI8NPmce5CL2ONE4s1WYcgeRg46bZixh/Z..CXvjo.qq',
      role: 'user',
      email: 'john@email.com'
    }
  ])
};