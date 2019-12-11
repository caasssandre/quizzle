const config = require('../../../knexfile').test
const database = require('knex')(config)

const db = require('../../../server/db/users')

beforeAll(()=> {
  return database.migrate.latest()
      .then(() => {
          return database.seed.run()
      })
})

test('addPlayerToTeam returns an array with the id of inserted player', ()=>{
  const expected = typeof 1
  return db.addPlayerToTeam('bob', 'winners', true, '000', database)
  .then(id=>{
    const actual = typeof id[0]
    expect(actual).toEqual(expected)
  })
})

test('getPlayersFromTeam returns all the players in one team', ()=>{
  const expected = [ { id: 99991,
    name: 'ross',
    team: 'hello',
    captain: 1,
    game_started: 0,
    socket_id: '000'
  },
  { id: 99993,
    name: 'han',
    team: 'hello',
    captain: 0,
    game_started: 0,
    socket_id: '002'
  },
  { id: 99994,
    name: 'ollie',
    team: 'hello',
    captain: 0,
    game_started: 0,
    socket_id: '003'
  } ]
  return db.getPlayersFromTeam('hello')
  .then(players=>{
    const actual = players
    expect(actual).toEqual(expected)
  })
})

test('getTeams returns an array', ()=> {
  const expected = [ 'hello', 'world', 'winners' ]
  return db.getTeams(database)
  .then(teams => {
    const actual = teams
    expect(actual).toEqual(expected)
  })
})


test('user in game updates game_started to true', ()=>{
  const expected =  [
    { id: 99991,
    name: 'ross',
    team: 'hello',
    captain: 1,
    game_started: 1,
    socket_id: '000'
  },
  { id: 99993,
    name: 'han',
    team: 'hello',
    captain: 0,
    game_started: 1,
    socket_id: '002'
  },
  { id: 99994,
    name: 'ollie',
    team: 'hello',
    captain: 0,
    game_started: 1,
    socket_id: '003'
  } 
  ]
  return db.userInGame('hello', database)
  .then(()=>{
    db.getPlayersFromTeam('hello')
    .then(players=> {
      const actual = players
      expect(actual).toEqual(expected)
    })
  })
})

test('getTeamBySocketId return player associated with the socket', ()=>{
  const expected = { id: 99991,
    name: 'ross',
    team: 'hello',
    captain: 1,
    game_started: 1,
    socket_id: '000'
  }
  return db.getTeamBySocketId('000', database)
  .then(player=>{
    const actual = player
    expect(actual).toEqual(expected)
  })
})

test('removePlayer should remove player from db', ()=>{
  const expected = 1
  return db.removePlayer(99991, database)
  .then(numRemoved=>{
    const actual = numRemoved
    expect(actual).toEqual(expected)
  })
})