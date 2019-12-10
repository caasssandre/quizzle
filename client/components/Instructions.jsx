import React from 'react'
import {connect} from 'react-redux'

export class Instructions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        return (
          <main>
            <section className='home instruct'>
              <h1 className='home-gameTitle'>Quizzical</h1>
              <div className='instruct'>
                <h3 className='instruct-subTitle'>Instructions:</h3>
                <div className='instruct-info'>
                  <p className='instruct-info__step'>Step 1:</p>
                  <p>
                    Create your team! One player (the team captain) needs to make a new team on the 'Create Team'
                    page. This will generate a new team code, which the captain should give to the rest of the team.
                  </p>
                  <p className='instruct-info__step'>Step 2:</p>
                  <p>
                    Time for everyone else to join! All other players go to the
                    'Join Team' page and join the team by entering in the team code.
                  </p>
                  <p className='instruct-info__step'>Step 3: </p>
                  <p>
                    Check everyone is in! All players currently in game will
                    display on the lobby page. Once everyone has joined, the
                    team captain should click the 'All players are in!' button.
                  </p>
                  <p className='instruct-info__step'>Step 4: </p>
                  <p className='final-step'>
                    Time to get answering questions. Each user will be able to
                    see one question and a list of four potential answers. But
                    here's the catch... your question does not match the answers
                    you can see! Your task -
                    find the player whose answers match your question, and
                    figure out the correct answer! You'll need to be quick about
                    it though - and answer before the time runs out!
                  </p>
                  <p className='instruct-info__step'>Points: </p>
                  <p className='scoring'>
                    Each correct answer: +50 per answer
                  </p>
                  <p className='scoring'>
                    Strike (all answers correct): +50 per team
                  </p>
                  <p className='final-step'>
                    Streak (multiple strikes in a row): Extra for experts - get a streak and find out!
                  </p>
                </div>
                <div className='home-btns__btn' onClick={(e)=>this.props.changePage(e, 'main')}>
                  Main Menu
                </div>
              </div>
            </section>
          </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        room: state.roomName,
    }
}

export default connect(mapStateToProps)(Instructions)