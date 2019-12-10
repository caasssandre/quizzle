const app = require('../../../server/server')
const request = require('supertest')
require("babel-polyfill")

test('it works', () => {
  expect(17).toBeGreaterThan(6)
})


// describe('get Questions', () => {
//   it('should get 2 arrays of 5 questions', async () => {
//     const res = await request(app)
//       .get('https://opentdb.com/api.php?amount=5&type=multiple')
//     expect(res.statusCode).toEqual(200)
//   })
// })
