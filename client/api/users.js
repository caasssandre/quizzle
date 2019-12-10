import request from 'superagent'

export function addPlayerToTeam(user, team, captain, socket){
  return request
    .post('/api/v1/users')
    .send({user, team, captain, socket})
    .then(res => res.body)
}

export function getTeams(){
  return request.get('/api/v1/teams')
}

export function getPlayersByTeam(team){
  return request.get('/api/v1/users?team=' + team)
}