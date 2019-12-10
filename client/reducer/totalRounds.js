const reducer = (state = 5, action) => {
    switch (action.type) {
      case 'SET_TOTAL_ROUNDS':{
        return action.totalRounds
      }
      default:
        return state
    }
  }
  
  export default reducer