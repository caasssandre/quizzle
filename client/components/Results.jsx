import React from 'react'
import { connect } from 'react-redux'
import socket from '../api/socket'

import ResultSplash from './ResultSplash'

import UIfx from 'uifx'


const correctfx = "/sfx/correct.mp3"
const incorrectfx = "/sfx/incorrect.mp3"
const correct = new UIfx(correctfx);
const incorrect = new UIfx(incorrectfx)

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonClicked: false
    }
  }

  componentDidMount() {
    if (this.props.playerResponses[0]) {
      if (this.props.playerResponses[0].selectedAnswer == this.props.playerResponses[0].correctAnswer) {
        socket.emit('score', { score: 1, teamName: this.props.teamName })
      }
      else {socket.emit('score', { score: 0, teamName: this.props.teamName })}
    }
    else {socket.emit('score', { score: 0, teamName: this.props.teamName })}

    setTimeout(() => {
      this.setState({
        showResults: true
      })
      if (!this.props.playerResponses[0]) {
        incorrect.play()
      }
      else if (this.props.playerResponses[0].selectedAnswer == this.props.playerResponses[0].correctAnswer) {
        correct.play()
      } else {
        incorrect.play()
      }
    }, 2000)
  }


  nextQuestion = () => {
    socket.emit('new question', { teamName: this.props.teamName, numOfPlayers: this.props.players.length })
    socket.emit('check for strike', this.props.teamName)
  }

  endGame = () => {
    if (this.state.buttonClicked == true) {
      // do nothing
    }
    else {
      socket.emit('check for strike', this.props.teamName)
      socket.emit('increment pages', this.props.teamName)
      this.setState({
        buttonClicked: true
      })
    }
  }

  showScore = (response) => {
    return (
      <div className='results-points'>
        {response.correctAnswer == response.selectedAnswer && <h4>+50 pts</h4>}
        {this.props.strike && <h4>STRIKE! +50 pts</h4>}
        {this.props.strike * this.props.strikeCount > 0 &&
          <h4>STREAK x{this.props.strikeCount + 1}! +{(this.props.strikeCount) * 50} pts</h4>
        }
      </div>
    )
  }

  showAnswer = (response) => {
    return (
      response.correctAnswer == response.selectedAnswer ?
        <div className='results-answers'>
          <h3>Correct: {response.correctAnswer}</h3>
        </div> :
        <div className='results-answers'>
          <h3 className='results-incorrect'>Incorrect: {response.selectedAnswer}</h3>
          <h3>Correct: {response.correctAnswer}</h3>
        </div>
    )
  }

  beQuicker = () => {
    return (
      <div>
        <h1 className='results-noAnswer'>Be quicker next time!</h1>
        {this.props.questions.jumbledTrivias &&
          <>
            <h2 className='results-question'>{this.props.questions.jumbledTrivias[this.props.player.index].question}</h2>
            <h3>Correct: {this.props.questions.jumbledTrivias[this.props.player.index].correctAnswer}</h3>
          </>}
      </div>
    )
  }

  render() {
    let response = this.props.playerResponses[0]
    if (!this.state.showResults) {
      return < ResultSplash />
    }
    else {
      return (
        <div className='results'>
          {response != undefined ?
            <div>
              {this.showScore(response)}
              <h2 className='results-question'>{response.question}</h2>
              {this.showAnswer(response)}
            </div> :
            this.beQuicker()}
          <div className='results-btns'>
            {this.props.player.captain && this.props.roundCount < this.props.totalRounds && (
              <div
                className='results-btns__btn'
                onClick={this.nextQuestion}>
                Next Question
              </div>
            )}
            {this.props.player.captain && this.props.roundCount == this.props.totalRounds && (
              <div
                className='results-btns__btn'
                onClick={this.endGame}>
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
    totalRounds: state.totalRounds,
    strikeCount: state.strikeCount,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(Results)
