import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'


import Welcome from './Welcome'
import Game from './Game'
import Results from './Results'
import GameEnd from './GameEnd'
import Lobby from './Lobby'
import Leaderboard from './Leaderboard'
import StopGame from './StopGame'

import socket from '../api/socket'

import { saveSocketId } from '../actions/index'
import { goToGame, goToMainMenu, incrementPage, goToStopGame} from '../actions/index'
import { addQuestions, resetQuestions } from '../actions/index'
import { resetPlayerResponses } from '../actions/index'
import { clearPlayers } from '../actions/index'
import { incrementAnswerCount, resetAnswerCount } from '../actions/index'
import { resetClock, decrementClock } from '../actions/index'
import { incrementScore, resetScore, saveStrike, resetStrike, saveStreak } from '../actions/index'
import { incrementRound, resetRound, setTotalRounds} from '../actions/index'
import { addLeaderboard, resetLeaderboard} from '../actions/index' 

import UIfx from 'uifx'

const cooldownfx = "/sfx/cooldown2.mp3"
const cooldown = new UIfx(cooldownfx);

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      missingPlayers:[],
      roundScores: [] 
    }     
  }

  componentDidMount(){ 
    // Handle browser navigation    
    window.addEventListener('popstate', () => {
      history.pushState(null, null, location.href)
      history.go(1)
    })
    
    const noSleep = new NoSleep()
      document.addEventListener('touchstart', function() {
        noSleep.enable()
      })

    // Receives socket id from server, adds to state
    socket.on('send id', id=>{
      this.props.dispatch(saveSocketId(id))
    })

    // Stops game when another player leaves the team
    socket.on('user has left team', player=>{
      this.props.dispatch(goToStopGame())
      // this.props.dispatch(clearPlayers())
      this.setState({
        missingPlayers:[...this.state.missingPlayers, player.name]
      })
    })

    // Reset game
    socket.on('reset game', () => {
      this.props.dispatch(resetQuestions())
      this.props.dispatch(resetPlayerResponses())
      this.props.dispatch(resetAnswerCount())
      this.props.dispatch(resetRound())
      this.props.dispatch(resetScore())
      this.props.dispatch(resetLeaderboard())
      this.props.dispatch(resetStrike())
    })

    // Page Changes
    socket.on('increment pages', () => {
      this.props.dispatch(incrementPage())
    })

    // Reset Game - back to main menu
    socket.on('main menu', () => {
      this.props.dispatch(goToMainMenu())
    })

    // When back-end receives 'all players in', it makes the api call to get new questions
    socket.on('all players in', () => { 
      this.props.dispatch(goToGame())
    })

    // Set total rounds
    socket.on('receive total rounds', totalRounds => {
      this.props.dispatch(setTotalRounds(totalRounds))
    })

    // Prepare game to start new round
    // When back-end receives 'new question', it makes the api call to get new questions
    socket.on('new question', () => {      
      this.props.dispatch(resetAnswerCount())
      this.props.dispatch(resetQuestions())
      this.props.dispatch(resetPlayerResponses())
      this.props.dispatch(incrementRound())
      this.props.dispatch(goToGame())
    })

    // Receives and sets questions array from API call, and starts the timer
    socket.on('receive questions', questions => {
      this.props.dispatch(resetClock(this.props.players.length))
      this.props.dispatch(addQuestions(questions))
      cooldown.play()

      this.interval = setInterval(() => {
        if (this.props.clock == 0 || this.props.pageNumber != 3) {
          clearInterval(this.interval)
          this.props.dispatch(resetClock(this.props.players.length))
        }
        else { this.props.dispatch(decrementClock()) }
      }, 1000)
    })

    // Handle answer count
    socket.on('submitted answer', () => {
      this.props.dispatch(incrementAnswerCount())
    })

    // Handle score
    socket.on('score', score => {
      this.setState({
        roundScores: [...this.state.roundScores, score]
      })
      this.props.dispatch(incrementScore(score))
    })

    socket.on('check for strike', ()=>{
      if(!this.state.roundScores.includes(0)){
        this.props.dispatch(saveStrike(1))
        this.props.dispatch(saveStreak(this.props.strikeCount))
      }
      else{
        this.props.dispatch(saveStrike(0))
      }
      this.setState({
        roundScores: []
      })
    })

    // Leaderboard
    socket.on('receive leaderboard', leaderboard => {
      this.props.dispatch(addLeaderboard(leaderboard))
    })
  }  
  
  render() {
    return (      
      <Router>
        {this.props.pageNumber == 1 && <Welcome />}
        {this.props.pageNumber == 2 && <Lobby />}
        {this.props.pageNumber == 3 && <Game />}
        {this.props.pageNumber == 4 && <Results strike={!this.state.roundScores.includes(0)} />}
        {this.props.pageNumber == 5 && <GameEnd />}
        {this.props.pageNumber == 6 && <Leaderboard />}
        {this.props.pageNumber == 7 && <StopGame players={this.state.missingPlayers} />}
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    pageNumber: state.pageNumber,
    clock: state.clock,
    players: state.players,
    strikeCount: state.strikeCount
  }
}

export default connect(mapStateToProps)(App)
