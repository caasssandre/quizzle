const config = require('../../../knexfile').test
const database = require('knex')(config)
const request = require('supertest')
const app = require('../../../server/server')
require("babel-polyfill")

beforeAll(() => {
  return database.migrate.latest()
    .then(() => {
      return database.seed.run()
    })
})

test('it works', () => {
  expect(17).toBeGreaterThan(6)
})


describe('get Teams', () => {
  it('should get the teams', async () => {
    const res = await request(app)
      .get('/api/v1/teams')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(['hello', 'world'])
  })
})

describe('getPlayersByTeam', () => {
  it('gets all the players in a team', async () => {
    const res = await request(app)
      .get('/api/v1/users?team=hello')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual([{
      captain: 1,
      game_started: 0,
      id: 1,
      name: "ross",
      socket_id: "000",
      team: "hello"
    },
      {
        captain: 0,
        game_started: 0,
        id: 3,
        name: "han",
        socket_id: "002",
        team: "hello" 
      },
      {
        captain: 0,
        game_started: 0,
        id: 4,
        name: "ollie",
        socket_id: "003",
        team: "hello"
      }])
  })
})

describe('addPlayerToTeam', () => {
  it('add a player to the database', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        user: 'Julia',
        team: 'COOL',
        captain: true,
        socket: 'socket'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body[0]).toHaveProperty('socket_id')
  })
})
