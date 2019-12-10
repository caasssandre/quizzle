const express = require('express')

const db = require('../db/users')

const router = express.Router()

router.get('/', (req, res) => {
  db.getPlayersFromTeam(req.query.team)
  .then(players => {
    res.send(players)})
})

router.post('/', (req,res) => {
  db.addPlayerToTeam(req.body.user, req.body.team, req.body.captain, req.body.socket)
  .then(() =>{db.getPlayersFromTeam(req.body.team)
    .then(players => res.send(players))
  })
})

module.exports = router