import React from 'react'
import { connect } from 'react-redux'
import socket from '../api/socket'

import ResultSplash from './ResultSplash'

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonClicked:false
    }
  }

  componentDidMount() {
    if (this.props.playerResponses[0]) {
      if (this.props.playerResponses[0].selectedAnswer == this.props.playerResponses[0].correctAnswer) {
        socket.emit('score', { score: 1, teamName: this.props.teamName})
      }
      else {
        socket.emit('score', { score: 0, teamName: this.props.teamName })
      }

    }
    else {
      socket.emit('score', { score: 0, teamName: this.props.teamName })
    }
    setTimeout(() => {
      this.setState({
        showResults: true
      })
    }, 2000)
  }

  nextQuestion = () => {
    socket.emit('new question', { teamName: this.props.teamName, numOfPlayers: this.props.players.length })
    socket.emit('check for strike', this.props.teamName)
  }

  endGame = () => {
    if(this.state.buttonClicked == true){
      // do nothing
    }
    else{
      socket.emit('check for strike', this.props.teamName)
      socket.emit('increment pages', this.props.teamName)
      this.setState({
        buttonClicked:true
      })
    }
  }

  render() {
    let response = this.props.playerResponses[0]
    if (!this.state.showResults) {
      return < ResultSplash />
    }
    else {
      return (
        <div className='results'>
          <h1 className='results-gameTitle'>Quizzical</h1>
           {this.props.strike && <h2 className="results-points">Strike!! +50 pts</h2>}
          {response != undefined ? (
            
            <div>
              <h2 className='results-question'>{response.question}</h2>

              {response.correctAnswer == response.selectedAnswer ? (
                <div className='results-answers'>
                  <h3>Correct: {response.correctAnswer}</h3>
                </div>
              ) : (
                  <div className='results-answers'>
                    <h3 className='results-incorrect'>Incorrect: {response.selectedAnswer}</h3>
                    <h3>Correct: {response.correctAnswer}</h3>
                  </div>
                )}
            </div>
          ) : (
              <div>
                <h1 className='results-noAnswer'>Be quicker next time!</h1>
              </div>
            )}
          <div className='results-btns'>

            {this.props.player.captain && this.props.roundCount < this.props.totalRounds && (
              <div
                className='results-btns__btn'
                onClick={this.nextQuestion}
              >
                Next Question
              </div>
            )}
            {this.props.player.captain && this.props.roundCount == this.props.totalRounds && (
              <div
                className='results-btns__btn'
                onClick={this.endGame}
              >
                End Game
                  </div>
            )}
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    teamName: state.teamName,
    playerResponses: state.playerResponses,
    player: state.player,
    players: state.players,
    roundCount: state.roundCount,
    totalRounds: state.totalRounds
  }
}

export default connect(mapStateToProps)(Results)
