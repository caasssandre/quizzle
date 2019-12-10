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

  finishRound = () => {
    console.log('hi')
    socket.emit('increment pages', this.props.teamName)
  }

  // handleClick = event => {
  //   event.preventDefault()
  //   if (this.props.answerCount == this.props.players.length - 1) {
  //     this.selectAnswer(event)
  //     this.finishRound()
  //   }
  //   else {
  //     this.selectAnswer(event)
  //   }
  // }

  // selectAnswer = (event) => {
  //   this.props.dispatch({
  //     type: 'SUBMIT_ANSWER',
  //     response: {
  //       question: this.props.questions.jumbledTrivias[this.props.player.index]
  //         .question,
  //       correctAnswer: this.props.questions.jumbledTrivias[
  //         this.props.player.index
  //       ].correctAnswer,
  //       selectedAnswer: event.target.id
  //     }
  //   })
  //   this.setState({
  //     submittedAnswer: true
  //   })
  //   socket.emit('submitted answer', this.props.teamName)
  // }
  

  render(){
    if (this.props.clock == 0 && this.props.player.captain && this.state.finishedRound == false) { 
      this.finishRound()
      this.setState({
        finishedRound: true
      })
    }
    else if (this.props.clock === 5){
      countdownFx.play()
    }
    
    let q = this.props.questions
    if(!q.trivias){
      return (
        <QuestionSplash />
      )
    }
    if(q.trivias){
      // let trivia = this.props.questions.trivias[this.props.player.index]
      // let jumbledTrivia = this.props.questions.jumbledTrivias[this.props.player.index]
      return (
        this.props.clock > this.props.players.length * 20 ? <QuestionSplash />:
        <div className='questions'>
          <ProgressBar/>
          <Question finishRound={this.finishRound}/>
            {/* <h2 className='questions-title'>
              {trivia.question}
            </h2>
          {!this.state.submittedAnswer && (
            <div className='questions-btns'>
              <div
                className='questions-btns__btn'
                id={
                  jumbledTrivia[this.state.display1]
                }
                onClick={this.handleClick}
              >
                {jumbledTrivia[this.state.display1]}
              </div>
              <div
                className='questions-btns__btn'
                id={
                  jumbledTrivia[this.state.display2]
                }
                onClick={this.handleClick}
              >
                {jumbledTrivia[this.state.display2]}
              </div>
              <div
                className='questions-btns__btn'
                id={
                  jumbledTrivia[this.state.display3]
                }
                onClick={this.handleClick}
              >
                {jumbledTrivia[this.state.display3]}
              </div>
              <div
                className='questions-btns__btn'
                id={
                  jumbledTrivia[this.state.display4]
                }
                onClick={this.handleClick}
              >
                {jumbledTrivia[this.state.display4]}
              </div>
            </div>
          )}
          {this.state.submittedAnswer && (
            <div className='questions-btns__answered'>
              <div>{this.props.playerResponses[0].selectedAnswer}</div>
            </div>
          )} */}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
    questions: state.questions,
    // playerResponses: state.playerResponses,
    teamName: state.teamName,
    players: state.players,
    clock: state.clock
  }
}

export default connect(mapStateToProps)(Game)
