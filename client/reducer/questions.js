const reducer = (state = {}, action) => {
  switch (action.type){
    case 'RESET':{
        return {}
      }
    case 'ADD_QUESTIONS':{
      return action.questions
    }
    case 'RESET_QUESTIONS':{
      return {}
    }

    default: return state
  }
}

export default reducer