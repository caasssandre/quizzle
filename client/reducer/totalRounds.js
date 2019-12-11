const reducer = (state = 5, action) => {
    switch (action.type) {
      case 'RESET':{
        return 5
      } 
      case 'SET_TOTAL_ROUNDS':{
        return action.totalRounds
      }
      default:
        return state
    }
  }
  
  export default reducer