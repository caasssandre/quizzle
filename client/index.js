import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import { Provider } from 'react-redux'

import App from './components/App'
import reducers from './reducer'

const store = createStore(reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Enable Audio Context for fast Audio loading
// const AudioContext = window.AudioContext || window.webkitAudioContext
// new AudioContext()

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
})