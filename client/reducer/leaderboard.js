const reducer = (state = [], action) => {
    switch (action.type){
      case 'RESET':{
        return []
      }
      case 'ADD_LEADERBOARD':{
        return action.leaderboard
      }
      case 'RESET_LEADERBOARD':{
        return []
      }
  
      default: return state
    }
  }
  
  export default reducer