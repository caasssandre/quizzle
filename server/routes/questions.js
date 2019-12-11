const request = require('superagent')
const he = require('he')

function getQuestions(qAmount) {
  const gameApi =
    'https://opentdb.com/api.php?amount=' +
    qAmount +
    '&type=multiple'

  return (
    request
      .get(gameApi)
      .then(res => processApiQuestions(res.body.results))
      .catch(error => console.log(error))
  )  
}

function processApiQuestions(apiResponse) { 
  let trivias = apiResponse.map(trivia => {
      return {
          question: he.decode(trivia.question),
          correctAnswer: he.decode(trivia.correct_answer),
          incorrectAnswer1: he.decode(trivia.incorrect_answers[0]),
          incorrectAnswer2: he.decode(trivia.incorrect_answers[1]),
          incorrectAnswer3: he.decode(trivia.incorrect_answers[2])
        }
      })
  return {
    trivias: trivias,
    jumbledTrivias: jumbleQuestions([...trivias])
  }
}

function jumbleQuestions(trivias) {
  let length = trivias.length
  let lastItem
  let i

  // While there remain elements to shuffle
  while (length>1) {
    // Pick a remaining element, excluding the last element
    i = Math.floor(Math.random() * (length-- -1))
    // And swap it with the last element.
    lastItem = trivias[length]
    trivias[length] = trivias[i]
    trivias[i] = lastItem
  }
  let jumbledTrivias = trivias
  return jumbledTrivias
}

module.exports = {
  getQuestions,
  jumbleQuestions
}
