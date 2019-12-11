import React from 'react'
import {connect} from 'react-redux'
import { goToMainMenu, resetQuestions, clearPlayers, resetLeaderboard, resetAnswerCount, resetScore} from '../actions'
import socket from '../api/socket'

class StopGame extends React.Component {
  constructor(props) {
    super(props)
  }

  reStartGame = () => {
    socket.emit('delete player', this.props.socketId)
    this.props.dispatch(goToMainMenu())
    this.props.dispatch(resetQuestions())
    this.props.dispatch(resetLeaderboard())
    this.props.dispatch(resetAnswerCount())
    this.props.dispatch(resetScore())
    this.props.dispatch(clearPlayers())
  }

  render() {
    return (
      <div className="lobby">
        <h2 className='lobby-title'>Oops it looks like somebody has closed their page!</h2>
        {this.props.missingPlayers &&
          this.props.missingPlayers.map(player => {
            return (
              <h3 className="lobby-users__name">{player} has left the game</h3>
            )
          })}
        <section>
          <div className='lobby-btn' onClick={this.reStartGame}>
            Go back to main screen
                </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    socketId: state.player.socketId,
    missingPlayers: state.missingPlayers
  }
}

export default connect(mapStateToProps)(StopGame)