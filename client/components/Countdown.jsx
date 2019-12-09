import React from 'react'
import {connect} from 'react-redux'

class Countdown extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <h1>{this.props.clock - this.props.players.length*20}</h1>
    )
  }
}

function mapStateToProps(state){
  return{
    clock:state.clock,
    players: state.players
  }
}

export default connect(mapStateToProps)(Countdown)