const reducer = (state = 0, action) => {
    switch (action.type){
      case 'RESET':{
        return 0
      }
      case 'INCREMENT_ANSWER_COUNT':{
        return state += 1
      }
      case 'RESET_ANSWER_COUNT':{
        return 0
      }
      default: return state
    }
  }
  
  export default reducer