import React from 'react'
import { connect } from 'react-redux'

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
    <div className='progress-bar'>
      <div
        ref={this.timer}
        style={{
          width: `${(this.props.clock * 100) /
            (this.props.players.length * 20)}%`,
          animationDuration: (this.props.players.length * 20 + 's')
        }}
        className='filler'
      ></div>
    </div>
    )
  }
}

function mapStateToProps(state){
  return{
    clock: state.clock,
    players: state.players,
  }
}

export default connect(mapStateToProps)(ProgressBar)