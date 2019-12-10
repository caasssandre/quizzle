const reducer = (state = {correct:0, total:0, points:0}, action) => {

  switch (action.type){    
    case 'INCREMENT_SCORE':{
      if(isNaN(action.score)){
        console.log('NaN')
        return {
          correct: state.correct,
          total: state.total += 1,
          points: state.points
        }
      }
      else{
        return{
          correct: state.correct + action.score,
          total: state.total += 1,
          points: state.points + (50 * action.score)
        }
      }
    }
    case 'SAVE_STRIKE':{
      if(isNaN(action.strike)){
        console.log('NaN')
        return {
          correct: state.correct,
          total: state.total,
          points: state.points
        }
      }
      else{
        return{
          correct: state.correct,
          total: state.total,
          points: state.points + (action.strike * 50)
        }
      }
    }
    case 'STREAK':{
      if(isNaN(action.streak)){
        console.log('NaN')
        return {
          correct: state.correct,
          total: state.total,
          points: state.points
        }
      }
      else{
        return{
          correct: state.correct,
          total: state.total,
          points: state.points + ((action.streak-1) * 50)
        }
      }
    }
    case 'RESET_SCORE':{
      return{
        correct: 0,
        total: 0,
        points: 0
      }
    }

    default: return state
  }
}

export default reducer