const server = require('./server')
const http = require('http').createServer(server)
const io = require('socket.io')(http)
const questions = require('./routes/questions')
const users = require('./db/users')
const leaderboard = require('./db/leaderboard')

const port = process.env.PORT || 3000

io.on('connection', function(socket){
  socket.emit('send id', socket.id)
  console.log('a user has connected')
  socket.on('disconnect', function(){
    users.getTeamBySocketId(socket.id).then(player => {
      if(player == undefined){
        console.log('user disconnected')
      }
      else{
        console.log(player.name + ' disconnected')
        io.to(player.team).emit('user has left team', player)
        users.removePlayer(player.id)
      }
    })
  })

  socket.on('join team', teamName =>{
    socket.join(teamName)
  })

  socket.on('show players in lobby', players =>{
    io.to(players[0].team).emit('show players in lobby', players)
  })

  socket.on('all players in', teamData=>{
    io.to(teamData.teamName).emit('all players in')
    questions.getQuestions(teamData.numOfPlayers)
    .then(questions => {
      io.to(teamData.teamName).emit('receive questions', questions)
    })
    users.userInGame(teamData.teamName)
  })

  socket.on('new question', teamData=>{
    io.to(teamData.teamName).emit('new question')
    questions.getQuestions(teamData.numOfPlayers)
    .then(questions => {
      io.to(teamData.teamName).emit('receive questions', questions)
    })
  })

  // HANDLE ROUNDS
  socket.on('set total rounds', data=> {
    io.to(data.teamName).emit('receive total rounds', data.totalRounds)
  })

  // HANDLE ANSWER SUBMISSION
  socket.on('submitted answer', teamName=>{
    io.to(teamName).emit('submitted answer')
  })

  // HANDLE SCORE
  socket.on('score', response=>{
    io.to(response.teamName).emit('score', response.score)
  })

  socket.on('check for strike', team=>{
    io.to(team).emit('check for strike')
  })

  // HANDLE PAGE CHANGES
  socket.on('main menu', teamName=>{
    io.to(teamName).emit('main menu')
  }) 

  socket.on('increment pages', teamName=>{
    io.to(teamName).emit('increment pages')
  }) 

  // LEADERBOARD
  socket.on('add to leaderboard', teamData => {
    leaderboard.addToLeaderboard(teamData).then(() => {
      leaderboard.getLeaderboard(teamData.teamSize, teamData.totalRounds).then(leaders => {
        io.to(teamData.teamCode).emit('receive leaderboard', leaders)
      })
    })
  })

  // RESET GAME
  socket.on('reset game', teamName => {
    io.to(teamName).emit('reset game')
  })

  //DELETE PLAYER FROM DB ON PLAY AGAIN
  socket.on('delete player', socketId =>{
    users.removePlayerBysocketId(socketId)
  })
})

http.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})