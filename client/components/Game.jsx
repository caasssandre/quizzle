import React from 'react'
import { connect } from 'react-redux'
import socket from '../api/socket'

import QuestionSplash from './QuestionSplash'

import UIfx from 'uifx'


const countdownFile = "/sfx/countdown.mp3"
const countdownFx = new UIfx(countdownFile);


class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display1: '',
      display2: '',
      display3: '',
      display4: '',
      clock: 10,
      finishedRound: false
    }
    // this.interval
  }

  componentDidMount() {
    const answerArr = ['correctAnswer', 'incorrectAnswer1', 'incorrectAnswer2', 'incorrectAnswer3']
    function randomAnswer(answerArr) {
      let length = answerArr.length
      let lastItem
      let i
      while (length) {
        i = Math.floor(Math.random() * length--)

        lastItem = answerArr[length]
        answerArr[length] = answerArr[i]
        answerArr[i] = lastItem
      }

      let randomArr = answerArr
      return randomArr
    }

    let randomArr = randomAnswer(answerArr)
    this.setState({
      display1: randomArr[0],
      display2: randomArr[1],
      display3: randomArr[2],
      display4: randomArr[3]
    })
  }

  finishRound = () => {
    socket.emit('increment pages', this.props.teamName)
  }

  handleClick = event => {
    event.preventDefault()
    if (this.props.answerCount == this.props.players.length - 1) {
      this.selectAnswer(event)
      this.finishRound()
    }
    else {
      this.selectAnswer(event)
    }
  }

  selectAnswer = (event) => {
    this.props.dispatch({
      type: 'SUBMIT_ANSWER',
      response: {
        question: this.props.questions.jumbledTrivias[this.props.player.index]
          .question,
        correctAnswer: this.props.questions.jumbledTrivias[
          this.props.player.index
        ].correctAnswer,
        selectedAnswer: event.target.id
      }
    })
    this.setState({
      submittedAnswer: true
    })
    socket.emit('submitted answer', this.props.teamName)
  }

  // animateTimer = () => {
  //   console.log(this.timer)
  //   if(document.getElementsByClassName('filler')[0]){
  //     document.getElementsByClassName('filler')[0].style.WebkitAnimationDuration =
  //     (this.props.players.length * 20)+'s'
  //     document.getElementsByClassName('filler')[0].style.animationDuration =
  //     (this.props.players.length * 20)+ 's'
  //   }
  // }
  

  render() {
    // if(this.props.clock - (this.props.players.length *20) == 0){
    //   this.animateTimer()

    // }

    if (this.props.clock == 0 && this.props.player.captain && this.state.finishedRound == false) {
 
      this.finishRound()
      this.setState({
        finishedRound: true
      })
    }
    let q = this.props.questions

    if (this.props.clock === 5){
      countdownFx.play()
    }

    return !q.trivias ? (
      <QuestionSplash />
    ) : this.props.clock > this.props.players.length * 20 ? (
      <QuestionSplash />
    ) : (
      <div className='questions'>
        <h1 className='questions-gameTitle'>Quizzical</h1>
        {/* <p className='questions-clock'>{this.props.clock}</p> */}
        <div className='progress-bar'>
          <div
            ref={this.timer}
            style={{
              width: `${(this.props.clock * 100) /
                (this.props.players.length * 20)}%`,
                animationDuration: (this.props.players.length *20 + 's')
            }}
            className='filler'
          ></div>
        </div>
        {q.trivias && (
          <h2 className='questions-title'>
            {q.trivias[this.props.player.index].question}
          </h2>
        )}
        {!this.state.submittedAnswer && q.jumbledTrivias && (
          <div className='questions-btns'>
            <div
              className='questions-btns__btn'
              id={
                q.jumbledTrivias[this.props.player.index][this.state.display1]
              }
              onClick={this.handleClick}
            >
              {q.jumbledTrivias[this.props.player.index][this.state.display1]}
            </div>
            <div
              className='questions-btns__btn'
              id={
                q.jumbledTrivias[this.props.player.index][this.state.display2]
              }
              onClick={this.handleClick}
            >
              {q.jumbledTrivias[this.props.player.index][this.state.display2]}
            </div>
            <div
              className='questions-btns__btn'
              id={
                q.jumbledTrivias[this.props.player.index][this.state.display3]
              }
              onClick={this.handleClick}
            >
              {q.jumbledTrivias[this.props.player.index][this.state.display3]}
            </div>
            <div
              className='questions-btns__btn'
              id={
                q.jumbledTrivias[this.props.player.index][this.state.display4]
              }
              onClick={this.handleClick}
            >
              {q.jumbledTrivias[this.props.player.index][this.state.display4]}
            </div>
          </div>
        )}

        {this.state.submittedAnswer && (
          <div className='questions-btns__answered'>
            <div>{this.props.playerResponses[0].selectedAnswer}</div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
    questions: state.questions,
    playerResponses: state.playerResponses,
    teamName: state.teamName,
    players: state.players,
    answerCount: state.answerCount,
    clock: state.clock
  }
}

export default connect(mapStateToProps)(Game)
