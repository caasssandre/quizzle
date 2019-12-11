const reducer = (state = [], action) => {
    switch (action.type){
      case 'RESET':{
        return []
      }
      case 'ADD_ALL_PLAYERS':{
        return action.players
      }
      case 'CLEAR_PLAYERS':{
        return []
      }
      case 'REMOVE_MISSING_PLAYERS':{
        let result = state.filter(player =>{
          return !action.missingPlayers.includes(player.name)
        })
        return result
      }
      default: return state
    }
  }
  
  export default reducer