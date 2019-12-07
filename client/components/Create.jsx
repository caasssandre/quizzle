import React from 'react'
import { connect } from 'react-redux'

import {savePlayerDetails, saveTeamName, incrementPage} from '../actions'
import { addPlayerToTeam, getTeams } from '../api/users'
import socket from '../api/socket'

class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      captainName:''
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
  
  getRandomUppercaseChar = () => {
    let r = Math.floor(Math.random() * 26);
    return String.fromCharCode(65 + r);
  }
  
  generateCode = () => {
    let prefix = new Array(2).fill().map(() => this.getRandomUppercaseChar()).join(""),
      integer = Math.floor((Math.random() * 9999));
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
    if(this.state.captainName == ''){
      this.setState({
        message:'Please enter a username'
      })
    }
    else{
      this.addPlayerToTeam(true)
    }
  }

  addPlayerToTeam = (captain) => {
    socket.emit('join team', this.state.team)
    addPlayerToTeam(this.state.captainName, this.state.team, captain, this.props.player.socketId)
      .then(players => {
        socket.emit('show players in lobby', players)
        this.props.dispatch(savePlayerDetails(this.state.player, captain, players.length-1))
      })
    this.props.dispatch(saveTeamName(this.state.team))

    this.props.dispatch(incrementPage())
  }


  render() {
    return (

      <main>
        <section className='setup'>
          <h1 className='setup-gameTitle'>Quizzical</h1>
          <h1 className='setup-create'>Game Created</h1>
          <h1>Team Code:</h1>
          <h1>{this.state.team}</h1>
          <p>Give this code to your team</p>
        </section>

        <section className='setup'>
          <p>Enter your player name below:</p>
          <input name="captainName" onChange={this.handleChange} value={this.state.captainName} />

          <form>
            <div className='setup-btns'>
              <section>
                <div className='setup-btns__btn' onClick={this.createTeam}>
                  Create Team
                </div>
              </section>
            </div>
            <section>
              <p>Or click below to join another team:</p>
              <div className='setup-btns__btn' onClick={(e) => this.props.changePage(e, 'join')}>
                Join Team
                </div>
            </section>
            {this.state.message != '' && <h2>{this.state.message}</h2>}
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

export default connect(mapStateToProps)(Create)