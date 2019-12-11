import React from 'react'
import { connect } from 'react-redux'

class LeaderboardSplash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <main>
        <div className='loading'>
          <div className='home-logo'>
            <img
              className='home-logo__pic2'
              id='home-logo'
              src='./imgs/img-2.png'
              alt='logo'
            />
          </div>
        </div>
          <h1 className='loading-text'>
            Waiting for captain to submit score...
          </h1>
      </main>
    )
  }
}

export default connect()(LeaderboardSplash)
