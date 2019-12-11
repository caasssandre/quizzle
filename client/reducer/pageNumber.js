const reducer = (state = 1, action) => {
    switch (action.type){
      case 'RESET':{
        return 1
      }
      case 'INCREMENT_PAGE':{
        return state += 1
      }
      case 'INSTRUCT':{
          return -1
      }
      case 'CREATE_GAME':{
        return 1
      }
      case 'START_GAME':{
        return 3
      }
      case 'MAIN_MENU': {
        return 1
      }
      case 'STOP_GAME': {
        return 7
      }
        default: return state
      }
  }
  
  export default reducer