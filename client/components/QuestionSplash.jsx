import React from 'react'
import { connect } from 'react-redux'

import Countdown from './Countdown'

class QuestionSplash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <>
        <main>
          <div className='loading'>
            {/* <h1 className='loading-gameTitle'>Quizzical</h1> */}
            <h1 className='loading-text'>Loading Question</h1>
            <h1 className='loading-questionCount'>{this.props.roundCount} / {this.props.totalRounds}</h1>
            {this.props.questions.trivias ? <Countdown /> :
              <div className='home-logo'>
            <img
              className='home-logo__pic2'
              id='home-logo'
              src='./imgs/img-2.png'
              alt='logo'
            />
          </div>
            // <div className='loading-art'>
            //   <div className='lds-grid'>
            //       <>
            //         <div></div>
            //         <div></div>
            //         <div></div>
            //         <div></div>
            //         <div></div>
            //         <div></div>
            //         <div></div>
            //         <div></div>
            //         <div></div>
            // </>
            //   </div>
            // </div>
            }
          </div>
        </main>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    roundCount: state.roundCount,
    totalRounds: state.totalRounds,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(QuestionSplash)
