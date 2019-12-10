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
        teamSize: 6
    })
    .then(id => {
        const actual = typeof id[0]
        expect(actual).toEqual(expected)
    })
})


test('get leaderboard team based on 2 teamsize ', () => {
    const expected = [{
             "id": 1,
             "teamName": "Woof",
             "teamScore": 55,
             "teamSize": 2
           }]
    return db.getLeaderboard('2', database)
    .then(teams => {
        const actual = teams
        expect(actual).toEqual(expected)
    })
})

test('get leaderboard team based on 4 teamsize ', () => {
    const expected = [{
             "id": 2,
             "teamName": "Red",
             "teamScore": 15,
             "teamSize": 4
           }]
    return db.getLeaderboard('4', database)
    .then(teams => {
        const actual = teams
        expect(actual).toEqual(expected)
    })
})
