const reducer = (state = '', action) => {
  switch (action.type) {
    case 'RESET':{
      return ''
    } 
    case 'SAVE_TEAM_NAME': {
      return action.teamName
    }
    default:
      return state
  }
}

export default reducer
