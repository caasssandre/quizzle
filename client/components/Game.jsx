import React from 'react'
import { connect } from 'react-redux'
import socket from '../api/socket'

import QuestionSplash from './QuestionSplash'
import ProgressBar from './ProgressBar'
import Question from './Question'

import UIfx from 'uifx'


const countdownFile = "/sfx/countdown.mp3"
const countdownFx = new UIfx(countdownFile);


class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      finishedRound: false
    }
  }

  componentDidUpdate(){
    if (this.props.clock == 0 && this.props.player.captain && this.state.finishedRound == false) { 
      this.finishRound()
      this.setState({
        finishedRound: true
      })
    }
    else if (this.props.clock === 5){
      countdownFx.play()
    }
  }

  finishRound = () => {
    socket.emit('increment pages', this.props.teamName)
  }  

  render(){
    let q = this.props.questions
    return(
      !q.trivias ? <QuestionSplash/> :
      this.props.clock > this.props.players.length * 15 ? <QuestionSplash/> :
        <div className='questions'>
          <ProgressBar/>
          <Question finishRound={this.finishRound}/>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
    questions: state.questions,
    teamName: state.teamName,
    players: state.players,
    clock: state.clock
  }
}

export default connect(mapStateToProps)(Game)
