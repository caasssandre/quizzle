const app = require('../../../server/server')
const request = require('supertest')
require("babel-polyfill")
const q = require('../../../server/routes/questions.js')
const nock = require('nock')

it('Should works', () => {
  expect(17).toBeGreaterThan(6)
})

it('Should jumble the array the api calls', () => {
  const expected = [1,2,3,4]

  const arr = [1,2,3,4]
  const actual = q.jumbleQuestions(arr)
    expect(actual).not.toBe(expected)
})


it('should call an api', () => { 
  nock('https://opentdb.com')
  .get('/api.php?amount=3&type=multiple')
  .reply(200, {results: [ { question: 'What is the title of song on the main menu in Halo?',
        correct_answer: 'Halo',
        incorrect_answers: [ 'Opening Suite',
         'Shadows',
         'Suite Autumn'] } ]})

 return q.getQuestions(3)
  .then((actual) => {
    expect(actual.jumbledTrivias).toHaveLength(1)
    console.log(actual.jumbledTrivias[0])
    expect(actual.jumbledTrivias[0]).toHaveProperty('correctAnswer', 'Halo')
  })
})

