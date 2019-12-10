import React from 'react'
import {connect} from 'react-redux'

class Countdown extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className='questions-countdown__circle'>
        <h1 className='questions-countdown'>{this.props.clock - this.props.players.length * 20}</h1>
      </div>
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