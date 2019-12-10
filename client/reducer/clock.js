const timePerPlayer = 20

const reducer = (state = timePerPlayer, action) => {
  switch (action.type){
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