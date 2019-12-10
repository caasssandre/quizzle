const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

function addPlayerToTeam(user, team, captain, socket, db = connection){
  return db('users').insert({'name': user, 'team': team, 'captain': captain, 'socket_id': socket})
}

function getPlayersFromTeam(team, db = connection){
  return db('users').where('team', team)
}

function getTeams(db = connection){
  return db('users')
  .distinct()
  .pluck('team')
  .then(teams => teams)
}

function userInGame(team, db = connection){
  return db('users').where('team', team)
   .update({'game_started': true})
   .then(res=>res)
}

function getTeamBySocketId(id, db = connection){
  return db('users').where('socket_id', id).first()
    .then(res=>res)
}

function removePlayer(id, db = connection){
  return db('users').where('id', id)
  .del().then(res=>res)
}

function removePlayerBySocketId(socketId, db = connection){
  return db('users').where('socket_id', socketId)
  .del().then(res=>res)
}

module.exports = {
  addPlayerToTeam,
  getPlayersFromTeam,
  getTeams,
  userInGame,
  getTeamBySocketId,
  removePlayer,
  removePlayerBySocketId
}