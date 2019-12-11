import React from 'react'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'
import socket from '../api/socket'

import UIfx from 'uifx'
import { isIOS } from 'react-device-detect';



const gameEndFile = "/sfx/win.mp3"
const gameEndFx = new UIfx(gameEndFile);
const buttonfx = "/sfx/buttonClick.mp3"
const buttonClick = new UIfx(buttonfx)

class GameEnd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonClicked: false
    }
  }

  componentDidMount() {
    gameEndFx.play()
  }

  playAgain = () => {
    if (!isIOS){
      buttonClick.play()
    }
    socket.emit('reset game', this.props.teamName)
    if (this.props.missingPlayers.length != 0) {
      socket.emit('all players in', { teamName: this.props.teamName, numOfPlayers: this.props.players.length - this.props.missingPlayers.length, players: this.props.players })
    } else {
      socket.emit('all players in', { teamName: this.props.teamName, numOfPlayers: this.props.players.length, players: this.props.players })
    }
  }

  mainMenu = () => {
    if (!isIOS){
      buttonClick.play()
    }
    socket.emit('reset game', this.props.teamName)
    socket.emit('main menu', this.props.teamName)
  }

  leaderboard = () => {
    if (!isIOS){
      buttonClick.play()
    }
    if (this.state.buttonClicked == true) {
      // do nothing
    }
    else {
      socket.emit('increment pages', this.props.teamName)
      this.setState({
        buttonClicked: true
      })
    }
  }

  render() {
    let options = {
      labelInterpolationFnc: function (value, index) {
        return data.label[index];
      }
    }
    let score = this.props.score
    let data = { label: ['Right', 'Wrong'], series: [score.correct, score.total - score.correct] }
    return (
      <div className='end'>
        <h1 className='end-title'>
          Congrats!
        </h1>
        {score.points == 0 &&
          <h3 className='end-allIncorrect'>Oops, you didn't get any answers correct...</h3>}
        {score.correct == score.total  &&
          <h3 className='end-allIncorrect'>Impressive, you got all of the answers correct!</h3>}
        {score.correct != 0 && score.correct != score.total &&
          <ChartistGraph className='ct-chart' data={data} options={options} type={'Pie'} />}
        <h3 className='end-scoreText'> Your score is {score.points} </h3>
        {this.props.player.captain && 
          <>
            <div className='home-btns'>
              <div className='home-btns__btn' onClick={this.leaderboard}>Submit Score</div>
            </div>
            <section className='leaderboard-btnSection'>
              <div className='setup-btns__btn' onClick={this.playAgain}>Play Again</div>
              <div className='home-btns__btn' onClick={this.mainMenu}>Main Menu</div>
            </section>
          </>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    teamName: state.teamName,
    player: state.player,
    players: state.players,
    score: state.score,
    missingPlayers: state.missingPlayers
  }
}

export default connect(mapStateToProps)(GameEnd)