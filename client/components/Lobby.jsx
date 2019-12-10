import React from 'react'
import { connect } from 'react-redux'
import socket from '../api/socket'
import UIfx from 'uifx'

const joinfx = "/sfx/playerJoin.mp3"
const join = new UIfx(joinfx);

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    socket.on('show players in lobby', players => {
      join.play();
      
      this.setState({
        players: players
      })
    })

  }



  handleClick = (e) => {
    e.preventDefault()
    socket.emit('set total rounds', {teamName: this.props.teamName, totalRounds: this.props.totalRounds})
    socket.emit('all players in', { teamName: this.props.teamName, numOfPlayers: this.state.players.length, players:this.state.players })
  }

  render() {
    return (
      <main>
        <section className='lobby'>
          <h1 className='lobby-gameTitle'>Quizzical</h1>

          {!this.props.player.captain &&
            <>
              <h2 className='lobby-title'>
                Welcome {this.props.player.name}!
              </h2>
              <h2 className='lobby-instructions'>Your team code is: {' '}
                {this.props.teamName}</h2>
            </>}
          {this.props.player.captain &&
            <>
              <h2 className='lobby-title'>
                Welcome {this.props.player.name}!
              </h2>
              <h2 className='lobby-instructions'>Give this code to your team: {' '}
                {this.props.teamName}</h2>
            </>}

          <div className='lobby-users'>
            {this.state.players.length > 0 &&
              this.state.players.map(player => {
                return (
                  <h3 className='lobby-users__name' key={player.id}>{player.name} is in!</h3>
                )
              })}
          </div>
          {this.props.player.captain &&
            <div className='lobby-btn' onClick={this.handleClick}>
              All Players Are In!
            </div>
          }

        </section>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    teamName: state.teamName,
    player: state.player,
    players: state.players,
    totalRounds: state.totalRounds
  }
}

export default connect(mapStateToProps)(Lobby)