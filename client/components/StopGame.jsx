import React from 'react'
import {connect} from 'react-redux'
import UIfx from 'uifx'
import { isIOS } from 'react-device-detect';

import socket from '../api/socket'

const buttonfx = "/sfx/buttonClick.mp3"
const buttonClick = new UIfx(buttonfx)

class StopGame extends React.Component {
  constructor(props) {
    super(props)
  }

  reStartGame = () => {
    socket.emit('delete player', {socketId: this.props.socketId, team: this.props.teamName})    
    if (!isIOS){
      buttonClick.play()
    }
    this.props.dispatch({
      type: 'RESET'
    })
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
    missingPlayers: state.missingPlayers,
    teamName: state.teamName
  }
}

export default connect(mapStateToProps)(StopGame)