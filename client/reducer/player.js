const reducer = (state = {}, action) => {
  switch (action.type){
    case 'RESET':{
      return {name: state.name, socketId:state.socketId}
    }
    case 'SAVE_PLAYER_DETAILS':{
      let player = action.playerInfo
      player.socketId = state.socketId
      return player
    }
    case 'ADD_SOCKET_ID':{
      state.socketId = action.socketId
      return state
    }

    default: return state
  }
}

export default reducer