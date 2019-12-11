const config = require('../../../knexfile').test
const database = require('knex')(config)

const db = require('../../../server/db/leaderboard')

beforeAll(() => {
    return database.migrate.latest()
    .then(() => {
        return database.seed.run()
    })
})


test('addToLeaderboard returns stuff', () => {
    const expected = typeof 1
    return db.addToLeaderboard({
        teamName: 'hello',
        teamScore: 50,
        teamSize: 6,
        totalRounds: 2
    })
    .then(id => {
        const actual = typeof id[0]
        expect(actual).toEqual(expected)
    })
})


test('get leaderboard team based on 2 teamsize ', () => {
    const expected = [{
             "id": 9991,
             "teamName": "Woof",
             "teamScore": 50,
             "teamSize": 2,
             "totalRounds": 2
           }]
    return db.getLeaderboard('2', '2', database)
    .then(teams => {
        const actual = teams
        expect(actual).toEqual(expected)
    })
})

test('get leaderboard team based on 4 teamsize ', () => {
    const expected = [{
             "id": 9993,
             "teamName": "Cats",
             "teamScore": 400,
             "teamSize": 4,
             "totalRounds": 5

           }]
    return db.getLeaderboard('4', '5', database)
    .then(teams => {
        const actual = teams
        expect(actual).toEqual(expected)
    })
})
