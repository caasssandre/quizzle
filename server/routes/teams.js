const express = require('express')
const router = express.Router()

const db = require('../db/users')

router.get('/', (req, res) =>{
  db.getTeams()
    .then(teams => res.json(teams))
})

module.exports = router