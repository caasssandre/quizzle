
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 99991, name: 'ross', team: 'hello', captain: true, game_started: false, socket_id:'000'},
        {id: 99992, name: 'kelly', team: 'world', captain: true, game_started: false, socket_id:'001'},
        {id: 99993, name: 'han', team: 'hello', captain: false, game_started: false, socket_id:'002'},
        {id: 99994, name: 'ollie', team: 'hello', captain: false, game_started: false, socket_id:'003'},
      ]);
    });
};
