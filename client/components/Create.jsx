import React from 'react'
import { connect } from 'react-redux'

import { savePlayerDetails, saveTeamName, incrementPage, setTotalRounds } from '../actions'
import { addPlayerToTeam, getTeams } from '../api/users'
import socket from '../api/socket'

export class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      captainName: '',
      buttonClicked: false,
      gameLength: 2
    }
  }

  componentDidMount() {
    this.generateCode()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.toUpperCase()
    })
  }

  handleLengthChange = (event) => {
    this.setState({
      gameLength: parseInt(event.target.value)
    })
  }

  getRandomUppercaseChar = () => {
    let r = Math.floor(Math.random() * 26);
    return String.fromCharCode(65 + r);
  }

  generateCode = () => {
    let prefix = new Array(2).fill().map(() => this.getRandomUppercaseChar()).join(""),
      integer = Math.floor((Math.random() * 99));
    let code = prefix + integer
    getTeams().then(teams => {
      if (teams.text.includes(code)) {
        this.generateCode()
      }
      else {
        this.setState({
          team: code
        })
        return code
      }
    })
  }

  createTeam = () => {
    if (this.state.buttonClicked == true) {
      // do nothing
    }
    else {
      if (this.state.captainName == '') {
        this.setState({
          message: 'Please enter a username'
        })
      }
      else {
        this.addPlayerToTeam(true)
        this.setState({
          buttonClicked: true
        })
      }
    }
  }

  addPlayerToTeam = (captain) => {
    socket.emit('join team', this.state.team)
    addPlayerToTeam(this.state.captainName, this.state.team, captain, this.props.player.socketId)
      .then(players => {
        socket.emit('show players in lobby', players)
        this.props.dispatch(savePlayerDetails(this.state.captainName, captain, players.length - 1))
      })
    this.props.dispatch(setTotalRounds(this.state.gameLength))
    this.props.dispatch(saveTeamName(this.state.team))
    this.props.dispatch(incrementPage())
  }

  render() {
    return (
      <main>
        <section className='setup'>
          <h1 className='setup-gameTitle'>Quizzical</h1>
          <h1 className='setup-welcomeCaptain' id="welcome">Welcome Captain!</h1>
        </section>

        <section className='setup'>
          <p className='setup-form'>Enter your name below:</p>
          <input className='setup-user__fields' id="capNameInput" type="text" name="captainName" placeholder={this.state.message} onChange={this.handleChange} value={this.state.captainName} />
          <p className='setup-form'>Select your game length:</p>
          <select className='setup-user__fields' name="gameLength" onChange={this.handleLengthChange}>
            <option value="2">Short</option>
            <option value="5">Medium</option>
            <option value="10">Long</option>
          </select>

          <form>
            <section>
              <div className='setup-btns__btn' id="createBtn" onClick={this.createTeam}>
                Create Team
                </div>
            </section>
            <section className='setup-join'>
              <p>Not quite what you want?</p>
              <div className='setup-btns__btn' id="joinBtn" onClick={(e) => this.props.changePage(e, 'join')}>
                Join Team
                </div>
              <div className='setup-btns__btn' id="rulesBtn" onClick={(e) => this.props.changePage(e, 'instructions')}>
                Rules
                </div>
              <div className='home-btns__btn' id="mmBtn" onClick={(e) => this.props.changePage(e, 'main')}>
                Main Menu
                </div>
            </section>
          </form>
        </section>
      </main>

    )
  }
}

function mapStateToProps(state) {
  return {
    player: state.player
  }
}

export default connect(mapStateToProps)(Create)