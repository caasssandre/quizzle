const timePerPlayer = 15

const reducer = (state = timePerPlayer, action) => {
  switch (action.type){
    case 'RESET':{
      return 15
    }
    case 'DECREMENT_CLOCK':{
      return state -1
    }
    case 'RESET_CLOCK':{
      return timePerPlayer * action.playerCount + 3
    }
    default: return state
  }
}

export default reducer