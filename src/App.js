import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.scss'
import subtitlesReducer from './reducers'
import Home from './pages'
import RemoteTest from './pages/RemoteTest'
import Remote from './pages/Remote'
import QRCode from './pages/QRCode'

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
          <Route path="/remote-test" component={RemoteTest} />
          <Route path="/remote" component={Remote} />
          <Route path="/qrcode" component={QRCode} />
        </Router>
      </Provider>
    )
  }
}

export default App
