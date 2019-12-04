const server = require('./server')
const http = require('http').createServer(server)
const io = require('socket.io')(http)

const port = process.env.PORT || 3000

io.on('connection', function(socket){
  console.log('a user has connected')
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
  socket.on('join team', teamName =>{
    socket.join(teamName)
  })
  socket.on('show players in lobby', players =>{
    io.to(players[0].team).emit('show players in lobby', players)
  })
  socket.on('all players in', teamData=>{
    io.to(teamData.teamName).emit('all players in')
    console.log(teamData.numOfPlayers)
    //call API with teamData.numOfPlayers
  })
  socket.on('new question', teamData=>{
    io.to(teamData.teamName).emit('new question')
  })
  socket.on('end game', teamData=>{
    io.to(teamData.teamName).emit('end game')
  })
  socket.on('main menu', teamData=>{
    io.to(teamData.teamName).emit('main menu')
  })  
})


http.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})