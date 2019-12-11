const reducer = (state = 0, action) => {
  switch (action.type){
    case 'RESET':{
      return 0
    } 
    case 'SAVE_STRIKE':{
      return (state + 1) * action.strike
    }
    case 'RESET_STRIKE':{
      return 0
    }
    default:
      return state
  }
}

export default reducer