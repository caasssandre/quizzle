const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SAVE_TEAM_NAME': {
      return action.teamName
    }
    case 'RESET_TEAM_NAME': {
      return ''
    }
    default:
      return state
  }
}

export default reducer
