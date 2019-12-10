import React from 'react'
import { connect } from 'react-redux'

import {savePlayerDetails, incrementPage, saveTeamName} from '../actions'
import { addPlayerToTeam, getTeams, getPlayersByTeam } from '../api/users'
import socket from '../api/socket'

 export class Join extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player:'',
      team:'',
      buttonClicked:false
    }
    this.joinTeam = this.joinTeam.bind(this)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.toUpperCase()
    })
  }

  getRandomUppercaseChar = () => {
    let r = Math.floor(Math.random() * 26);
    return String.fromCharCode(65 + r);
  }


  joinTeam = () => {
    if(this.state.buttonClicked == true){
      // do nothing
    }
    else{
      getTeams().then(res => {
        if(this.state.team == ''){
          this.setState({
            teamMessage:'Please enter a team code',
          })
        }
        else if(this.state.player == ''){
          this.setState({
            userMessage:'Please enter a username'
          })
        }
        else if (!res.text.includes(this.state.team)) {
          this.setState({
            teamMessage: 'This team does not exist',
            team: ''
          })
        }
        else {
          getPlayersByTeam(this.state.team).then(res => {
            if(JSON.parse(res.text)[0].game_started){
              this.setState({
                teamMessage: 'This team has started playing without you!',
                team: ''
              })
            }
            else if (!JSON.parse(res.text).find(player => {
              return player.name == this.state.player
            })) {
              this.addPlayerToTeam(false)
              this.setState({
                buttonClicked: true
              })
            }
            else {
              this.setState({
                userMessage: 'This username is taken',
                player: ''
              })
            }
          })
        }
      })
    }
  }

  addPlayerToTeam = (captain) => {
    socket.emit('join team', this.state.team)
    addPlayerToTeam(this.state.player, this.state.team, captain, this.props.player.socketId)
      .then(players => {
        socket.emit('show players in lobby', players)
        this.props.dispatch(savePlayerDetails(this.state.player, captain, players.length-1)
        )
      })
    this.props.dispatch(saveTeamName(this.state.team))
    this.props.dispatch(incrementPage())
  }

  render() {
    return (
      <main>
        <section className='setup'>
          <h1 className='setup-gameTitle'>Quizzical</h1>
          <form>
            <section className='setup-team'>
              <p className='setup-team__text'>Team Code:</p>
              <input
                id='team-text'
                className='setup-team__fields'
                type='text'
                name='team'
                placeholder={this.state.teamMessage}
                onChange={this.handleChange}
                value={this.state.team}
              />
            </section>
            <section className='setup-user'>
              <p className='setup-user__text'>User Name:</p>
              <input
                id='user-text'
                className='setup-user__fields'
                type='text'
                name='player'
                placeholder={this.state.userMessage}
                onChange={this.handleChange}
                value={this.state.player}
              />
            </section>
            <section>
              <div className='setup-btns__btn' id="join-btn" onClick={this.joinTeam}>
                Join Team
              </div>
            </section>
            <section className='setup-join'>
              <p>Not quite what you want?</p>
              <div
                className='setup-btns__btn'
                id='create-btn'
                onClick={e => this.props.changePage(e, 'create')}
              >
                Create Team
              </div>
              <div
                className='setup-btns__btn'
                onClick={e => this.props.changePage(e, 'instructions')}
              >
                Rules
              </div>
              <div
                className='setup-btns__btn'
                onClick={e => this.props.changePage(e, 'main')}
              >
                Main Menu
              </div>
            </section>
          </form>
        </section>
      </main>
    )
  }
}

function mapStateToProps(state){
  return{
    player: state.player
  }
}

export default connect(mapStateToProps)(Join)