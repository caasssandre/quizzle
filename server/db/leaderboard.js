const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

function addToLeaderboard(teamData, db = connection) {
  return db('leaderboard').insert({
    'teamName': teamData.teamName,
    'teamScore': teamData.teamScore,
    'teamSize': teamData.teamSize,
    'totalRounds': teamData.totalRounds
  })
}

function getLeaderboard(teamSize, totalRounds, db = connection) {
  return db('leaderboard')
    .where('teamSize', teamSize)
    .where('totalRounds', totalRounds)
    .orderBy('teamScore', 'desc')
    .select()
}

module.exports = {
  addToLeaderboard,
  getLeaderboard
}