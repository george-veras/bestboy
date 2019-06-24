import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import subtitlesReducer from './reducers'
import Home from './pages'

let store = createStore(
  subtitlesReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
      </Provider>
    )
  }
}

export default App
