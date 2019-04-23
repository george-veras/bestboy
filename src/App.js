import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import logo from './logo.svg'
import './App.css'
import subtitlesReducer from './reducers/subtitles'
import FileSelector from './components/FileSelector'

let store = createStore(
  subtitlesReducer,
  applyMiddleware(thunk)
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <FileSelector />
            <input type="button" onClick={this.addsOneSecond} value="+1 second" />
          </header>
        </div>
      </Provider>
    )
  }
}

export default App
