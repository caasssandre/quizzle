import React from 'react'
import { connect } from 'react-redux'
import Instructions from './Instructions'
import Create from './Create'
import Join from './Join'

export class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: "main",
      history: ["main"],
      historyIndex: 0
    }
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      let historyState = this.state.history
      let historyIndex = this.state.historyIndex

      if (historyIndex > 0) {
        this.state.history.pop()
        this.setState({
          display: historyState[historyIndex - 1],
          historyIndex: this.state.historyIndex - 1
        })
      }
    })
  }

  startClick = (e) => {
    e.preventDefault()
    this.props.dispatch({
      type: 'INCREMENT_PAGE'
    })
  }

  changePage = (event, page) => {
    event.preventDefault();
    this.setState({
      display: page,
      history: [...this.state.history, page],
      historyIndex: this.state.historyIndex + 1
    })
  }

  render() {
    return (
      <>
        {this.state.display == "main" && <main>
          <section className='home'>
            <h1 className='home-gameTitle'>Quizzical</h1>
            <div className='home-logo'>
              <img className='home-logo__pic' id="home-logo"
                src='./imgs/img-2.png'
                alt='logo'
              />
            </div>
            <div className='home-btns'>
<<<<<<< HEAD
              <div className='home-btns__btn' onClick={(e)=>this.changePage(e, 'create')}>
                Create team
||||||| merged common ancestors
              <div className='home-btns__btn' onClick={(e)=>this.changePage(e, 'create')}>
                CREATE TEAM
=======
              <div className='home-btns__btn' id="create-btn" onClick={(e) => this.changePage(e, 'create')}>
                CREATE TEAM
>>>>>>> 534cf88935aa648b7323fb2fbccd3db922356065
                  </div>
<<<<<<< HEAD
              <div className='home-btns__btn' onClick={(e)=>this.changePage(e, 'join')}>
                Join team
||||||| merged common ancestors
              <div className='home-btns__btn' onClick={(e)=>this.changePage(e, 'join')}>
                JOIN TEAM
=======
              <div className='home-btns__btn' id="join-btn" onClick={(e) => this.changePage(e, 'join')}>
                JOIN TEAM
>>>>>>> 534cf88935aa648b7323fb2fbccd3db922356065
                  </div>
              <div
                className='home-btns__btn' id="instruct-btn"
                onClick={(e) => this.changePage(e, 'instructions')}
              >
                How to play
                  </div>
            </div>
          </section>
        </main>}
        {this.state.display == "instructions" && <Instructions changePage={this.changePage} />}
        {this.state.display == "create" && <Create changePage={this.changePage} />}
        {this.state.display == "join" && <Join changePage={this.changePage} />}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    room: state.roomName,
    name: state.name
  }
}

export default connect(mapStateToProps)(Welcome)