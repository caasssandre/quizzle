const reducer = (state = [], action) => {
    switch (action.type){
      case 'ADD_ALL_PLAYERS':{
        return action.players
      }
      case 'CLEAR_PLAYERS':{
        return []
      }
      default: return state
    }
  }
  
  export default reducer