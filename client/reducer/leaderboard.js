const reducer = (state = [], action) => {
    switch (action.type){
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