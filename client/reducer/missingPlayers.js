const reducer = (state = [], action) => {
    switch (action.type){
      case 'ADD_MISSING_PLAYER':{
        return [...state, action.player]
      }
      case 'RESET_MISSING_PLAYERS':{
        return []
      }
      default: return state
    }
  }
  
  export default reducer